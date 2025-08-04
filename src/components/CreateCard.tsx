import { Formik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { initialValues } from "../utils/cards/initianalValues";
import { validationSchema } from "../utils/cards/validationSchema";
import { normalizeCard } from "../utils/NormalizeCard";
import { UnnormalizedCard } from "../interface/card/UnnormalizedCard";
import { postNewCard } from "../services/cardServices";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import InputField from "../components/inputcard/InputField";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CreateCard: FunctionComponent = () => {
  let navigate = useNavigate();

  return (
    <><Navbar onSearch={function (_term: string): void {
      throw new Error("Function not implemented.");
    }}/>
    <hr />
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const normalizedCard = normalizeCard({
          ...values,
          houseNumber: parseInt(values.houseNumber as unknown as string, 10) || 0,
          zip: parseInt(values.zip as unknown as string, 10) || 0,
        } as UnnormalizedCard);

        postNewCard(normalizedCard)
          .then((_res) => {
            sucessMassage("Your card was posted successfully!");
            navigate("/");
          })
          .catch((err) => {
            errorMessage(err.response.data);
          });
        resetForm();
      }}
    >
        {({ handleSubmit, isValid, dirty }) => (
          <form className="w-100" onSubmit={handleSubmit}  >
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
            <button
              disabled={!dirty || !isValid}
              type="submit"
              className="btn btn-primary m-3">
              Create Card
            </button>
          </form>
        )}
      </Formik><Footer /></>
  );
};

export default CreateCard;

