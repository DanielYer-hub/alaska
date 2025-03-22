import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getAllCards } from "../services/cardServices";
import { getFavoritesForUser } from "../utils/storage";
import { useAuth } from "../context/AuthContext";
import Bcard from "./cards/Bcards";

interface FavouriteCardsProps {}

const FavouriteCards: FunctionComponent<FavouriteCardsProps> = () => {
    const { user } = useAuth();
    const [favoriteCards, setFavoriteCards] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            getAllCards().then((res) => {
                const likedIds = getFavoritesForUser(user._id); 
                const filteredCards = res.data.filter((card: { _id: string; }) => likedIds.includes(card._id));
                setFavoriteCards(filteredCards);
            });
        } else {
            setFavoriteCards([]); 
        }
    }, [user]);

    return (
        <>
            <Navbar onSearch={() => {}} />
            <hr />
            <div>
                <h2>Favorite Cards</h2>
                <div className="row">
                    {favoriteCards.length > 0 ? (
                        favoriteCards.map((card) => <Bcard key={card._id} card={card} />)
                    ) : (
                        <p>No favorite cards yet.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FavouriteCards;
