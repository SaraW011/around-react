export default function Card({onCardClick, card}) {

    function handleClick() {
      onCardClick(card);
    }
  
    return (
      <li className="elements__element">
        <button
          className="elements__trash elements__trash_disabled"
          type="button"
          aria-label="delete card"
        ></button>
  
        <img 
        className="elements__image" 
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        />
  
        <div className="elements__info">
          <h2 className="elements__text">{card.name}</h2>
          <div className="elements__like-container">
            <button
              className="elements__heart"
              type="button"
              aria-label="like card"
            ></button>
  
            <div className="elements__number-of-likes"></div>
          </div>
        </div>
      </li>
    );
  }
  