import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BoardPreview from '../components/molecules/BoardPreview/BoardPreview'
import ItemCard from '../components/molecules/ItemCard/ItemCard'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import Button from '../components/atoms/Button/Button'
import IconButton from '../components/atoms/IconButton/IconButton'
import Skeleton from '../components/atoms/Skeleton/Skeleton'
import { PlusIcon, CloseIcon } from '../components/icons/Icons'
import { boardsApi } from '../services/api'
import './BoardsPage.css'

export default function BoardsPage() {
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [boardItems, setBoardItems] = useState([])
  const [loadingItems, setLoadingItems] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  
  // Pagination extensions
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const sentinelRef = useRef(null)

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
      await fetchBoards()
    } catch (err) {
      console.error('Failed to create board:', err)
    }
  }

  async function handleOpenBoard(board) {
    setSelectedBoard(board)
    setLoadingItems(true)
    setPage(1)
    try {
      const response = await boardsApi.getBoardItems(board.id, 1, 20)
      setBoardItems(response.items || [])
      setHasMore(response.has_more || false)
    } catch (err) {
      console.error('Failed to load board items:', err)
      setBoardItems([])
      setHasMore(false)
    } finally {
      setLoadingItems(false)
    }
  }

  const fetchMoreItems = useCallback(async () => {
    if (!selectedBoard || loadingMore || !hasMore) return
    setLoadingMore(true)
    const nextPage = page + 1
    
    try {
      const response = await boardsApi.getBoardItems(selectedBoard.id, nextPage, 20)
      setBoardItems(prev => [...prev, ...(response.items || [])])
      setHasMore(response.has_more || false)
      setPage(nextPage)
    } catch (err) {
      console.error('Failed to load more items:', err)
    } finally {
      setLoadingMore(false)
    }
  }, [selectedBoard, loadingMore, hasMore, page])

  useEffect(() => {
    if (!hasMore || loadingItems) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreItems()
        }
      },
      { rootMargin: '600px' }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loadingItems, fetchMoreItems])

  function handleCloseBoard() {
    setSelectedBoard(null)
    setBoardItems([])
    setPage(1)
    setHasMore(false)
    fetchBoards() // Refresh counts
  }

  return (
    <div className="boards-page">
      <AnimatePresence mode="wait">
        {selectedBoard ? (
          <motion.div
            key="board-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="boards-page__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <IconButton icon={<CloseIcon />} label="Back" onClick={handleCloseBoard} size="sm" />
                <h1 className="boards-page__title">{selectedBoard.name}</h1>
              </div>
              <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
                {boardItems.length} items
              </span>
            </div>

            {loadingItems ? (
              <div className="boards-page__items-grid">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} width="100%" height="220px" style={{ borderRadius: 'var(--radius-lg)' }} />
                ))}
              </div>
            ) : boardItems.length > 0 ? (
              <>
                <div className="boards-page__items-grid">
                  {boardItems.map((item, index) => (
                    <ItemCard key={item.id} item={item} index={index} onClick={setSelectedItem} />
                  ))}
                </div>
                {hasMore && <div ref={sentinelRef} style={{ height: '20px', margin: '20px 0' }} />}
                {loadingMore && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-6)' }}>
                    <Skeleton width="40px" height="40px" style={{ borderRadius: '50%' }} />
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-text-tertiary)' }}>
                <p>This board is empty.</p>
                <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                  Tap the Save button on any item to add it here.
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="board-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
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
                    <BoardPreview board={board} onClick={handleOpenBoard} />
                  </motion.div>
                ))
              )}

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
          </motion.div>
        )}
      </AnimatePresence>

      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}
