import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getAllCards } from "../services/cardServices";
import { useAuth } from "../context/AuthContext";
import Bcard from "./cards/Bcards";

const FavouriteCards: FunctionComponent = () => {
    const { user } = useAuth();
    const [favoriteCards, setFavoriteCards] = useState<any[]>([]);

    useEffect(() => {
        loadFavorites();
    }, [user]);

    const loadFavorites = () => {
        if (user) {
            getAllCards().then((res) => {
                const filteredCards = res.data.filter((card: { likes: string[] }) => card.likes.includes(user._id));
                setFavoriteCards(filteredCards);
            });
        }
    };

    const handleLikeToggle = (cardId: string) => {
        setFavoriteCards((prev) => prev.filter((card) => card._id !== cardId)); 
    };

    return (
        <>
            <Navbar onSearch={() => {}} />
            <hr />
            <div>
                <div className="row">
                    {favoriteCards.length > 0 ? (
                        favoriteCards.map((card) => <Bcard key={card._id} card={card} onLikeToggle={handleLikeToggle} />)
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
