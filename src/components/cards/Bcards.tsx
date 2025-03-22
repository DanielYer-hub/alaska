import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../../interface/card/Cards";
import "../style/Bcards.css";
import { saveFavoritesForUser, getFavoritesForUser } from "../../utils/storage";
import { useAuth } from "../../context/AuthContext";

interface BcardProps {
  card: Card;
}

const Bcard: FunctionComponent<BcardProps> = ({ card }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);


  useEffect(() => {
    if (user) {
      const userFavorites = getFavoritesForUser(user._id);
      setFavorites(userFavorites);
      setIsLiked(card._id ? userFavorites.includes(card._id) : false);
    }
  }, [user]);

  const handleLike = () => {
    let updatedFavorites: string[];
    if (isLiked) {
      updatedFavorites = favorites.filter(id => id !== card._id);
    } else {
      updatedFavorites = [...favorites, card._id!];
    }
    setFavorites(updatedFavorites);
    saveFavoritesForUser(user!._id, updatedFavorites);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="card m-3">
        <img
          className="card-img-top"
          src={card.image.url}
          alt={card.image.alt}
        />
        <div className="card-body">
          <h2 className="card-title">{card.title}</h2>
          <h6 className="card-subtitle mb-2 text-muted">{card.subtitle}</h6>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span>Phone: </span>
            <span>{card.phone}</span>
            <br />
            <span>Adress: </span>
            <span>{`${card.address.street} ${card.address.houseNumber}, ${card.address.city}`}</span>
            <br />
            <span>Card Number: </span>
            <span>{card.bizNumber}</span>
          </li>
        </ul>
        <div className="card-body">
          <a href={`tel:${card.phone}`}>
            <i className="fa-solid fa-phone"></i>
          </a>
          {user && (
          <button onClick={handleLike} className="like-button">
          <i className={isLiked ? "fa-solid fa-heart liked" : "fa-regular fa-heart"}></i>
        </button>
        )}
        </div>
      </div>
    </>
  );
};

export default Bcard;