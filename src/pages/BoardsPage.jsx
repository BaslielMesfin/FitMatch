import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BoardPreview from '../components/molecules/BoardPreview/BoardPreview'
import Button from '../components/atoms/Button/Button'
import Skeleton from '../components/atoms/Skeleton/Skeleton'
import { PlusIcon } from '../components/icons/Icons'
import { boardsApi } from '../services/api'
import './BoardsPage.css'

export default function BoardsPage() {
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchBoards() {
    try {
      const data = await boardsApi.getBoards()
      setBoards(data)
    } catch (err) {
      console.error('Failed to load boards:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBoards()
  }, [])

  async function handleCreateBoard() {
    const name = window.prompt("Enter board name:")
    if (!name?.trim()) return
    try {
      await boardsApi.createBoard(name)
      await fetchBoards() // Refresh
    } catch (err) {
      console.error('Failed to create board:', err)
    }
  }

  return (
    <div className="boards-page">
      <div className="boards-page__header">
        <h1 className="boards-page__title">Your Boards</h1>
        <Button variant="primary" size="sm" icon={<PlusIcon />} onClick={handleCreateBoard}>
          New Board
        </Button>
      </div>

      <div className="boards-page__grid">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} width="100%" height="240px" style={{ borderRadius: 'var(--radius-xl)' }} />
          ))
        ) : (
          boards.map((board, index) => (
            <motion.div
              key={board.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <BoardPreview board={board} />
            </motion.div>
          ))
        )}

        {/* Empty "Create" card */}
        {!loading && (
          <motion.div
            className="boards-page__create-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: boards.length * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateBoard}
          >
            <div className="boards-page__create-icon">
              <PlusIcon />
            </div>
            <span>Create Board</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
