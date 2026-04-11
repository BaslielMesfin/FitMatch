import Lottie from 'lottie-react'
import rippleAnimation from '../../../assets/Ripple loading animation.json'
import './Loader.css'

export default function Loader({ fullPage = false, size = 150, inline = false }) {
  let containerClass = 'lottie-loader-container'
  if (fullPage) containerClass += ' lottie-loader-container--full-page'
  if (inline) containerClass += ' lottie-loader-container--inline'

  return (
    <div className={containerClass}>
      <Lottie
        animationData={rippleAnimation}
        loop={true}
        style={{ width: size, height: size }}
      />
    </div>
  )
}
