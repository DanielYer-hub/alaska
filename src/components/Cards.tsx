import { FunctionComponent, useEffect, useState } from "react";
import Bcard from "./cards/Bcards";
import { Card } from "../interface/card/Cards";
import { getAllCards } from "../services/cardServices";
import "./style/Cards.css";


interface CardsProps {
  searchTerm: string; /////
}

const Cards: FunctionComponent<CardsProps> = ( {searchTerm} ) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

//////////////////////////
const filteredCards = cards.filter(
  (card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
);
//////////////////////////

  useEffect(() => {
    getAllCards()
      .then((res) => {
        console.log(res.data);
        setCards(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading ? (
        <center>
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </center>
      ) : (
  //       <div className="row">
  //         {cards.map((card: Card) => (
  //           <Bcard key={String(card._id)} card={card} />
  //         ))}
  //       </div>
  //     )}
  //   </>
  // );

  <div className="row">
  {filteredCards.length > 0 ? (
    filteredCards.map((card: Card) => (
      <Bcard key={String(card._id)} card={card} />
    ))
  ) : (
    <p>Cards not found...</p>
  )}
</div>
)}
</>
);
};

export default Cards;