import React, { Component } from 'react'
import Lottie from 'lottie-react'
import rippleAnimation from '../../../assets/Ripple loading animation.json'
import './Loader.css'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Lottie Error:", error, errorInfo); }
  render() { 
    if (this.state.hasError) return <span>Loading...</span>;
    return this.props.children;
  }
}

export default function Loader({ fullPage = false, size = 150, inline = false }) {
  let containerClass = 'lottie-loader-container'
  if (fullPage) containerClass += ' lottie-loader-container--full-page'
  if (inline) containerClass += ' lottie-loader-container--inline'

  // Diagnostic log to check Vite's json import mapping
  // console.log("Ripple JSON Import:", rippleAnimation);

  // If Vite wraps it in .default, unwrap it
  const animationDataToUse = rippleAnimation?.default || rippleAnimation;

  return (
    <div className={containerClass}>
      <ErrorBoundary>
        <Lottie
          animationData={animationDataToUse}
          loop={true}
          style={{ width: size, height: size }}
        />
      </ErrorBoundary>
    </div>
  )
}
