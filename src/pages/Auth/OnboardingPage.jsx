import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import Button from '../../components/atoms/Button/Button'
import Badge from '../../components/atoms/Badge/Badge'
import './OnboardingPage.css' // We will create this

const AESTHETICS = ['Streetwear', 'Old Money', 'Minimalist', 'Y2K', 'Gorpcore', 'Dark Academia', 'Athleisure', 'Quiet Luxury']
const BRANDS = ['Zara', 'ASOS', 'SSENSE', 'H&M', 'Uniqlo', 'Urban Outfitters', 'Aritzia', 'Nike']
const GENDERS = ['Male', 'Female']
const FITS = ['Oversized', 'Tailored / Slim', 'Relaxed', 'Not Sure / Skip']

export default function OnboardingPage() {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  // Form State
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [fit, setFit] = useState('')
  const [selectedAesthetics, setSelectedAesthetics] = useState([])

  function toggleArrayItem(array, setArray, item) {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item))
    } else {
      setArray([...array, item])
    }
  }

  async function handleFinish() {
    if (!user) return
    setLoading(true)

    // Save to Supabase (Profiles table)
    // Wait, since we are doing custom onboarding, we need to save this to user_metadata or a profiles table.
    // Let's save to user_metadata for simplicity first!
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          age: parseInt(age),
          gender,
          fit_preference: fit,
          aesthetics: selectedAesthetics,
          onboarded: true
        }
      })
      if (error) throw error
      
      // 2. Prime the backend taste profile with selected aesthetics
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        await fetch('http://localhost:8000/api/discovery/initialize-taste', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            age: parseInt(age),
            gender,
            fit_preference: fit,
            aesthetics: selectedAesthetics
          })
        })
      }

      // 3. Refresh local auth state to recognize 'onboarded' status
      await refreshUser()
      
      navigate('/')
    } catch (err) {
      console.error("Onboarding error:", err.message)
      alert("Failed to save profile: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <span className="gradient-text">Personalize your feed</span>
          <div className="onboarding-progress">
            Step {step} of 3
          </div>
        </div>

        {step === 1 && (
          <div className="onboarding-step">
            <h3>Tell us a bit about yourself</h3>
            <label>Age</label>
            <input 
              type="number" 
              className="onboarding-input" 
              placeholder="e.g. 24" 
              value={age} 
              onChange={e => setAge(e.target.value)} 
            />
            
            <label style={{marginTop: 'var(--space-4)'}}>Select your gender</label>
            <div className="onboarding-options">
              {GENDERS.map(g => (
                <div 
                  key={g} 
                  className={`onboarding-option ${gender === g ? 'active' : ''}`}
                  onClick={() => setGender(g)}
                >
                  {g}
                </div>
              ))}
            </div>

            <Button variant="primary" size="lg" fullWidth onClick={() => setStep(2)} disabled={!age || !gender}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <h3>How do you like your clothes to fit?</h3>
            <div className="onboarding-options">
              {FITS.map(f => (
                <div 
                  key={f} 
                  className={`onboarding-option ${fit === f ? 'active' : ''}`}
                  onClick={() => setFit(f)}
                >
                  {f}
                </div>
              ))}
            </div>
            
            <div style={{display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)'}}>
              <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
              <Button variant="primary" fullWidth onClick={() => setStep(3)} disabled={!fit}>Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <h3>Select your favorite aesthetics</h3>
            <p className="text-secondary" style={{marginBottom: 'var(--space-3)'}}>Pick at least 1</p>
            <div className="onboarding-tags">
              {AESTHETICS.map(a => (
                <Badge 
                  key={a} 
                  label={a} 
                  variant={selectedAesthetics.includes(a) ? 'active' : 'default'} 
                  onClick={() => toggleArrayItem(selectedAesthetics, setSelectedAesthetics, a)}
                />
              ))}
            </div>

            <div style={{display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)'}}>
              <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
              <Button variant="primary" fullWidth onClick={handleFinish} disabled={selectedAesthetics.length < 1 || loading}>
                {loading ? 'Saving...' : 'Finish Setup'}
              </Button>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}
