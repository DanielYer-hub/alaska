import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { getAllCards, updateCard } from "../services/cardServices";
import { validationSchema } from "../utils/cards/validationSchema";
import { normalizeCard } from "../utils/NormalizeCard"; 
import InputField from "../components/inputcard/InputField";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card } from "../interface/card/Cards";
import { UnnormalizedCard } from "../interface/card/UnnormalizedCard";

const EditCard: FunctionComponent = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    getAllCards()
      .then((res) => {
        const foundCard = res.data.find((c: Card) => c._id === cardId);
        if (foundCard) setCard(foundCard);
      })
      .catch((err) => console.log(err));
  }, [cardId]);

  return (
    <>
      <Navbar onSearch={() => {}} />
      <hr />
      {card && (
        <Formik
          initialValues={{
            title: card.title,
            subtitle: card.subtitle,
            description: card.description,
            phone: card.phone,
            email: card.email,
            web: card.web,
            url: card.image?.url || "",
            alt: card.image?.alt || "",
            state: card.address?.state || "",
            country: card.address?.country || "",
            city: card.address?.city || "",
            street: card.address?.street || "",
            houseNumber: card.address?.houseNumber || 0,
            zip: card.address?.zip || 0,
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            const normalizedData = normalizeCard(values as UnnormalizedCard);

            updateCard(cardId!, normalizedData)
              .then(() => navigate("/mycard"))
              .catch((err) => console.log(err));
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} style={{ backgroundColor: "#f4f4f4" }}>
              <InputField label="Title" name="title" required />
              <InputField label="Subtitle" name="subtitle" required />
              <InputField label="Description" name="description" required />
              <InputField label="Phone" name="phone" type="tel" required />
              <InputField label="Email" name="email" type="email" required />
              <InputField label="Web" name="web" type="url" />
              <InputField label="Image URL" name="url" type="url" />
              <InputField label="Alt" name="alt" />
              <InputField label="State" name="state" />
              <InputField label="Country" name="country" required />
              <InputField label="City" name="city" required />
              <InputField label="Street" name="street" required />
              <InputField label="House Number" name="houseNumber" type="number" required />
              <InputField label="Zip Code" name="zip" type="number" required />
              <button type="submit" className="btn btn-primary mt-4">
                Update Card
              </button>
            </form>
          )}
        </Formik>
      )}
      <Footer />
    </>
  );
};

export default EditCard;
