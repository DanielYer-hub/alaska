import { Formik } from "formik";
import { FunctionComponent } from "react";
import "./style/Register.css";
import { useNavigate } from "react-router-dom";
import { initialValues } from "../utils/initialValues";
import { validationSchema } from "../utils/validationSchema";
import { unnormalizedUser } from "../interface/user/UnnormalizedUser";
import { registerUser } from "../services/userService";
import { normalizeUser } from "../utils/normalizeUser";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import InputField from "../components/input/InputField";
import CheckboxField from "../components/input/CheckBox";

const Register: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <video className="background-video" autoPlay muted loop>
        <source src="/content/vecteezy_video-of-arctic-wolf-in-zoo_35139842 (online-video-cutter.com).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container w-100 border p-6  register">
        <div className="w-50 register-form">
          <h4 className="display-4">Register</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const normalizedUser = normalizeUser(values as unknown as unnormalizedUser);
              registerUser(normalizedUser)
                .then((res) => {
                  sucessMassage(`${res.data.email} registered successfully`);
                  navigate("/login");
                })
                .catch((err) => {
                  errorMessage(err.response.data);
                });
              resetForm();
            }}
          >
            {({ handleSubmit, isValid, dirty }) => (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <InputField label="First Name" name="first" required />
                  <InputField label="Middle Name" name="middle" />
                  <InputField label="Last Name" name="last" required />
                </div>
                <div className="row g-3">
                  <InputField label="Phone" name="phone" type="tel" required />
                  <InputField label="Email" name="email" type="email" required />
                </div>
                <div className="row g-3">
                  <InputField label="Password" name="password" type="password" required />
                  <InputField label="Confirm Password" name="confirmPassword" type="password" required />
                </div>
                <div className="row g-3">
                  <InputField label="Profile Image" name="image" type="url" />
                  <InputField label="Alternative Text" name="alt" />
                </div>
                <div className="row g-3">
                  <InputField label="State" name="state" />
                  <InputField label="Country" name="country" required />
                  <InputField label="City" name="city" required />
                </div>
                <div className="row g-3">
                  <InputField label="Street" name="street" required />
                  <InputField label="House Number" name="houseNumber" type="number" required />
                  <InputField label="Zip Code" name="zip" type="number" required />
                </div>
                <CheckboxField label="Is Business?" name="isBusiness" />
                <button
                  disabled={!dirty || !isValid}
                  type="submit"
                  className="btn btn-success d-grid gap-1 col-6 mx-auto"
                >
                  Complete
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Register;