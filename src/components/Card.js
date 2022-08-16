function Card({ imgSrc, name, onClick }, ref) {
  return (
    <div ref={ref} className="card" onClick={onClick}>
      <div className="card-img">
        <img
          src={`${process.env.PUBLIC_URL}/images/${imgSrc}`}
          alt="dumpling"
        />
      </div>
      <div className="card-content">
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Card;
