import './BoardPreview.css'

export default function BoardPreview({ board, onClick }) {
  return (
    <article className="board-preview" onClick={() => onClick?.(board)} role="button" tabIndex={0}>
      <div className="board-preview__covers">
        {board.coverImages?.slice(0, 3).map((img, i) => (
          <div key={i} className="board-preview__cover-slot">
            <img src={img} alt="" loading="lazy" />
          </div>
        ))}
        {(!board.coverImages || board.coverImages.length === 0) && (
          <div className="board-preview__cover-empty" />
        )}
      </div>
      <div className="board-preview__info">
        <h3 className="board-preview__name">{board.name}</h3>
        <p className="board-preview__count">{board.itemCount} items</p>
      </div>
    </article>
  )
}
