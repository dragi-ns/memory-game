import { Component } from 'react';

// Have to use class components beacuse of react-move-flip...
class Card extends Component {
  render() {
    const { imgSrc, name, onClick } = this.props;
    return (
      <div className="card" onClick={onClick}>
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
}

export default Card;
