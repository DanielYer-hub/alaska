import { FunctionComponent } from "react";
import { Card } from "../../interface/card/Cards";
import "../style/Bcards.css";

interface BcardProps {
  card: Card;
}

const Bcard: FunctionComponent<BcardProps> = ({ card }) => {
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
        </div>
      </div>
    </>
  );
};

export default Bcard;