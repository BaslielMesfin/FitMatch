import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IconButton from '../../atoms/IconButton/IconButton'
import ItemCard from '../../molecules/ItemCard/ItemCard'
import Loader from '../../atoms/Loader/Loader'
import { SendIcon, ImageIcon, SparkleIcon } from '../../icons/Icons'
import { chatApi } from '../../../services/api'
import './StylistChat.css'

const STARTER_PROMPTS = [
  { text: 'Old Money interview outfit' },
  { text: 'Summer beach casual' },
  { text: 'First date dinner look' },
  { text: 'Street style for winter' },
]

export default function StylistChat() {
  const [messages, setMessages] = useState([
    {
      id: '0',
      role: 'assistant',
      text: "Hey! I'm your AI Stylist. Tell me what vibe you're going for, or upload a photo of something you already own — I'll find pieces that match perfectly."
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

    // Create a placeholder AI message that we'll update progressively
    const aiMsgId = (Date.now() + 1).toString()
    setMessages(prev => [...prev, {
      id: aiMsgId,
      role: 'assistant',
      text: '',
      suggestedItems: [],
      aestheticDetected: null,
      isStreaming: true,
    }])
    setTimeout(scrollToBottom, 100)

    try {
      await chatApi.streamMessage(message, (chunk) => {
        if (chunk.type === 'text') {
          setMessages(prev => prev.map(m =>
            m.id === aiMsgId
              ? { ...m, text: chunk.content, isStreaming: !chunk.final }
              : m
          ))
          scrollToBottom()
        } else if (chunk.type === 'meta') {
          setMessages(prev => prev.map(m =>
            m.id === aiMsgId
              ? {
                  ...m,
                  suggestedItems: chunk.suggestedItems || [],
                  aestheticDetected: chunk.aestheticDetected,
                  isStreaming: false,
                }
              : m
          ))
          scrollToBottom()
        }
      })
    } catch (err) {
      console.warn('Stream failed, falling back:', err.message)
      // Fallback to non-streaming
      try {
        const response = await chatApi.sendMessage(message)
        setMessages(prev => prev.map(m =>
          m.id === aiMsgId
            ? {
                ...m,
                text: response.reply,
                suggestedItems: response.suggested_items || [],
                aestheticDetected: response.aesthetic_detected,
                isStreaming: false,
              }
            : m
        ))
      } catch (fallbackErr) {
        setMessages(prev => prev.map(m =>
          m.id === aiMsgId
            ? {
                ...m,
                text: `I'd love to help with "${message}"! Make sure the backend server is running at localhost:8000.`,
                isStreaming: false,
              }
            : m
        ))
      }
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
      text: `Uploaded: ${file.name}`,
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
        text: "I see the item you uploaded! When connected to the Gemini Vision API, I'll analyze the color, fabric, and style to find complementary items from our target stores.",
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
                <p>
                  {msg.text}
                  {msg.isStreaming && <span className="chat-cursor">|</span>}
                </p>

                {/* Show AI-detected aesthetic */}
                {msg.aestheticDetected && (
                  <div className="chat-message__aesthetic">
                    <span className="chat-message__aesthetic-tag">
                      {msg.aestheticDetected}
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

        {/* Only show the loader when isTyping AND no streaming message is actively rendering */}
        {isTyping && !messages.some(m => m.isStreaming) && (
          <motion.div
            className="chat-message chat-message--assistant"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="chat-message__avatar">
              <SparkleIcon />
            </div>
            <div className="chat-message__bubble chat-message__bubble--assistant" style={{ padding: '4px 12px' }}>
              <Loader size={40} inline={true} />
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
