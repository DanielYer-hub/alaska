import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./style/Login.css";
import { useAuth } from "../context/AuthContext";
import { getUserById, loginUser } from "../services/userService";
import { saveToStorage } from "../utils/storage";
import { jwtDecode } from "jwt-decode";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().email().min(5),
      password: yup
        .string()
        .required()
        .min(7, "Password too short! Should be at least 9 characters")
        .max(20)
        .matches(
          /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
          "Password must contain at least one special character"
        ),
    }),
onSubmit: async (values, { resetForm }) => {
  try {
    console.log("Sending login request with:", values);
    login(values.email, values.password)
    // const res = await loginUser(values);
    // console.log("Server response:", res.data);
    // if (res.data) {
    //   saveToStorage("token", res.data);
    //   const decode = jwtDecode(res.data);
    //   console.log("decode:", decode['_id']);
    //   const userResponse = await getUserById(decode['_id']);
    //   console.log("user:", userResponse);

      // login(res.data.email, res.data.token);
  
      navigate("/dashboard");
      resetForm();
    
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please try again.");
  }
}
});
  return (
    <div className="container">
      <video className="background-video" autoPlay muted loop>
        <source
          src="/content/vecteezy_video-of-arctic-wolf-in-zoo_35139847.MP4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="w-50 border mx-auto py-3 p-4 my-5 login">
        <h4 className="display-4">Login</h4>
        <form className="mb-4" onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              autoComplete="on"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            />
            <label htmlFor="email">E-mail:</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
            />
            <label htmlFor="password">Password:</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <button
            disabled={!formik.dirty || !formik.isValid}
            type="submit"
            className="btn btn-success w-50"
          >
            Login
          </button>
        </form>
        <span>
          New User? Please <Link to="/register">register</Link> first.
        </span>
      </div>
    </div>
  );
};

export default Login;