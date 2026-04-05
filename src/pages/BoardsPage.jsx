import { motion } from 'framer-motion'
import BoardPreview from '../components/molecules/BoardPreview/BoardPreview'
import Button from '../components/atoms/Button/Button'
import { PlusIcon } from '../components/icons/Icons'
import { MOCK_BOARDS } from '../data/mockData'
import './BoardsPage.css'

export default function BoardsPage() {
  return (
    <div className="boards-page">
      <div className="boards-page__header">
        <h1 className="boards-page__title">Your Boards</h1>
        <Button variant="primary" size="sm" icon={<PlusIcon />}>
          New Board
        </Button>
      </div>

      <div className="boards-page__grid">
        {MOCK_BOARDS.map((board, index) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <BoardPreview board={board} />
          </motion.div>
        ))}

        {/* Empty "Create" card */}
        <motion.div
          className="boards-page__create-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: MOCK_BOARDS.length * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="boards-page__create-icon">
            <PlusIcon />
          </div>
          <span>Create Board</span>
        </motion.div>
      </div>
    </div>
  )
}
