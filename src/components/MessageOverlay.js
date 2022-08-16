function MessageOverlay({ message, onClick }, ref) {
  return (
    <div ref={ref} className="overlay">
      <div className="overlay-card" key={message}>
        <div className="card-header">{message}</div>
        <div className="card-footer">
          <button className="btn" onClick={onClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageOverlay;
