import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IconButton from '../../atoms/IconButton/IconButton'
import ItemCard from '../../molecules/ItemCard/ItemCard'
import { SendIcon, ImageIcon, SparkleIcon } from '../../icons/Icons'
import { chatApi } from '../../../services/api'
import './StylistChat.css'

const STARTER_PROMPTS = [
  { emoji: '👔', text: 'Old Money interview outfit' },
  { emoji: '🏖️', text: 'Summer beach casual' },
  { emoji: '💃', text: 'First date dinner look' },
  { emoji: '🎒', text: 'Street style for winter' },
]

export default function StylistChat() {
  const [messages, setMessages] = useState([
    {
      id: '0',
      role: 'assistant',
      text: "Hey! I'm your AI Stylist ✨ Tell me what vibe you're going for, or upload a photo of something you already own — I'll find pieces that match perfectly from Zara, ASOS, and SSENSE."
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSend(text) {
    const message = text || input.trim()
    if (!message || isTyping) return

    const userMsg = { id: Date.now().toString(), role: 'user', text: message }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(scrollToBottom, 100)

    try {
      const response = await chatApi.sendMessage(message)

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.reply,
        suggestedItems: response.suggested_items || [],
        aestheticDetected: response.aesthetic_detected,
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (err) {
      console.warn('Chat API error:', err.message)
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: `Great choice! For a "${message}" look, I'd recommend structured pieces in neutral tones with quality fabrics. Let me connect to the AI to get you personalized recommendations... \n\n*Tip: Make sure the backend server is running at localhost:8000*`,
      }
      setMessages(prev => [...prev, aiMsg])
    } finally {
      setIsTyping(false)
      setTimeout(scrollToBottom, 100)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleSend()
  }

  function handleImageUpload() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: `📷 Uploaded: ${file.name}`,
      isImage: true,
    }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)
    setTimeout(scrollToBottom, 100)

    try {
      const response = await chatApi.uploadImage(file, 'What goes well with this?')

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.reply,
        suggestedItems: response.suggested_items || [],
        aestheticDetected: response.aesthetic_detected,
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (err) {
      console.warn('Image upload error:', err.message)
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "I see the item you uploaded! When connected to the Gemini Vision API, I'll analyze the color, fabric, and style to find complementary items from our target stores. 👀✨",
      }
      setMessages(prev => [...prev, aiMsg])
    } finally {
      setIsTyping(false)
      setTimeout(scrollToBottom, 100)
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="stylist-chat">
      <div className="stylist-chat__messages">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`chat-message chat-message--${msg.role}`}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {msg.role === 'assistant' && (
                <div className="chat-message__avatar">
                  <SparkleIcon />
                </div>
              )}
              <div className={`chat-message__bubble chat-message__bubble--${msg.role}`}>
                <p>{msg.text}</p>

                {/* Show AI-detected aesthetic */}
                {msg.aestheticDetected && (
                  <div className="chat-message__aesthetic">
                    <span className="chat-message__aesthetic-tag">
                      ✨ {msg.aestheticDetected}
                    </span>
                  </div>
                )}

                {/* Show product suggestions inline */}
                {msg.suggestedItems?.length > 0 && (
                  <div className="chat-message__suggestions">
                    <p className="chat-message__suggestions-label">Found these for you:</p>
                    <div className="chat-message__suggestions-grid">
                      {msg.suggestedItems.slice(0, 4).map((item, i) => (
                        <a
                          key={item.id || i}
                          href={item.product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="chat-suggestion-card"
                        >
                          {item.image_url && (
                            <img src={item.image_url} alt={item.title} loading="lazy" />
                          )}
                          <div className="chat-suggestion-card__info">
                            <span className="chat-suggestion-card__brand">{item.brand || item.store}</span>
                            <span className="chat-suggestion-card__title">{item.title}</span>
                            {item.price > 0 && (
                              <span className="chat-suggestion-card__price">${item.price.toFixed(2)}</span>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="chat-message chat-message--assistant"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="chat-message__avatar">
              <SparkleIcon />
            </div>
            <div className="chat-message__bubble chat-message__bubble--assistant">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="stylist-chat__starters">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt.text}
              className="stylist-chat__starter-chip"
              onClick={() => handleSend(prompt.text)}
            >
              <span>{prompt.emoji}</span>
              <span>{prompt.text}</span>
            </button>
          ))}
        </div>
      )}

      <form className="stylist-chat__input-area" onSubmit={handleSubmit}>
        <input type="file" ref={fileInputRef} accept="image/*" hidden onChange={handleFileChange} />
        <IconButton
          icon={<ImageIcon />}
          label="Upload image"
          size="md"
          onClick={handleImageUpload}
        />
        <input
          id="chat-input"
          className="stylist-chat__input"
          type="text"
          placeholder="Describe your ideal outfit..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          disabled={isTyping}
        />
        <motion.button
          className="stylist-chat__send-btn"
          type="submit"
          disabled={!input.trim() || isTyping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <SendIcon />
        </motion.button>
      </form>
    </div>
  )
}
