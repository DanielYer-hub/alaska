import { FunctionComponent, useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./style/Cards.css";
import { getAllCards, deleteCard } from "../services/cardServices";
import { useAuth } from "../context/AuthContext";
import { Card } from "../interface/card/Cards";
import { useNavigate } from "react-router-dom";


interface MyCardsProps {}
 
const MyCards: FunctionComponent<MyCardsProps> = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [cards, setCards] = useState<Card[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getAllCards()
          .then((res) => {
            const userCards = res.data.filter((card: Card) => card.user_id === user?._id);
            setCards(userCards);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      }, [user]);

      const handleDelete = (cardId: string) => {
        deleteCard(cardId)
          .then(() => {
            setCards(cards.filter((card) => card._id !== cardId));
          })
          .catch((err) => console.log(err));
      };

    return ( <>
    <Navbar onSearch={function (_term: string): void {
            throw new Error("Function not implemented.");
        } }/>
<hr />

{isLoading ? (
        <center>
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </center>
      ) : (
        <div className="row">
          {cards.map((card) => (
            <div key={card._id} className="card m-3">
              <img className="card-img-top" src={card.image.url} alt={card.image.alt} />
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
              <div className="card-body" style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => handleDelete(card._id!)} className="btn btn-danger">
                <i className="fa-solid fa-trash"></i>
                </button>
                <button onClick={() => navigate(`/edit-card/${card._id}`)} className="btn btn-warning">
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
 )}
    <Footer/>
    </> );
}
 
export default MyCards;