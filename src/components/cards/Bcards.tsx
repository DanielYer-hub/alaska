import { FunctionComponent, useState } from "react";
import { Card } from "../../interface/card/Cards";
import "../style/Bcards.css";
import { useAuth } from "../../context/AuthContext";
import { deleteCard, toggleLike } from "../../services/cardServices";
import { useNavigate } from "react-router-dom";

interface BcardProps {
  card: Card;
  onLikeToggle?: (cardId: string) => void;
}

const Bcard: FunctionComponent<BcardProps> = ({ card, onLikeToggle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(user?._id ? card.likes?.includes(user._id) ?? false : false);
  const [likeCount, setLikeCount] = useState(card.likes?.length ?? 0);

  const handleLike = async () => {
    if (!user?._id || !card._id) return;
    try {
      await toggleLike(card._id);
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      onLikeToggle?.(card._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    if (!card._id) return;
    deleteCard(card._id)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="card m-3">
      <img className="card-img-top" src={card.image?.url ?? ""} alt={card.image?.alt ?? "No image"} />
      <div className="card-body">
        <h2 className="card-title">{card.title}</h2>
        <h6 className="card-subtitle mb-2 text-muted">{card.subtitle}</h6>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span>Phone: </span>
          <span>{card.phone ?? "N/A"}</span>
          <br />
          <span>Address: </span>
          <span>{`${card.address?.street ?? ""} ${card.address?.houseNumber ?? ""}, ${card.address?.city ?? ""}`}</span>
          <br />
          <span>Card Number: </span>
          <span>{card.bizNumber ?? "N/A"}</span>
        </li>
      </ul>
      <div className="card-body">
        <a href={`tel:${card.phone ?? ""}`}>
          <i className="fa-solid fa-phone"></i>
        </a>
        {user && (
          <button onClick={handleLike} className="like-button">
            <i className={isLiked ? "fa-solid fa-heart liked" : "fa-regular fa-heart"}></i>
            <span>{likeCount}</span>
          </button>
        )}
        {user?._id === card.user_id && (
          <>
            <button onClick={() => navigate(`/edit-card/${card._id ?? ""}`)} className="btn btn-warning">Update</button>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Bcard;
