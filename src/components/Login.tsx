import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./style/Login.css";
import { useAuth } from "../context/AuthContext";
import { getUserById, loginUser } from "../services/userService";
import { saveToStorage } from "../utils/storage";
import { jwtDecode } from "jwt-decode";
// import { decodeToken } from "../services/tokenService";

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
    const res = await loginUser(values);
    console.log("Server response:", res);
    if (res.data) {
      saveToStorage("token", res.data);
      const decode = jwtDecode(res.data);
      console.log("decode:", decode['_id']);
      const userResponse = getUserById(decode['_id']);
      console.log("user:", userResponse.data);

      login(res.data.email, res.data.token);
      navigate("/dashboard");
      resetForm();
    } else {
      alert("Invalid login credentials");
    }
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


// import { FormikValues, useFormik } from "formik";
// import { FunctionComponent } from "react";
// import * as yup from "yup";
// import { loginUser } from "../services/userService";
// import { errorMessage, sucessMassage } from "../services/feedbackService";
// import { useNavigate } from "react-router-dom";

// interface LoginProps {}

// const Login: FunctionComponent<LoginProps> = () => {
//   let navigate = useNavigate();
//   const formik: FormikValues = useFormik<FormikValues>({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: yup.object({
//       email: yup.string().email().min(5).required(),
//       password: yup
//         .string()
//         .min(7)
//         .max(20)
//         .required()
//         .matches(
//           /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-"])[A-Za-z\d!@#$%^&*\-"]{8,}$/,
//           'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-"), and be at least 8 characters long'
//         ),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       loginUser(values)
//         .then((res) => {
//           const token = res.data;
//           sessionStorage.setItem("token", token);
//           sucessMassage(`${values.email} Logged in suuccessfuly`);
//           navigate("/");
//         })
//         .catch((err) => {
//           console.log(err);
//           errorMessage(err.response.data);
//         });
//       resetForm();
//     },
//   });
//   return (
//     <>
//       <div className="w-50 mx-auto py-3">
//         <h1 className="display-1 text-center mb-4">Login</h1>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="form-floating mb-3">
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               placeholder="jhon@doe.com"
//               name="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//               required
//             />
//             <label htmlFor="email">Email</label>
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-danger">{formik.errors.email}</p>
//             )}
//           </div>

//           <div className="form-floating mb-3">
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder=""
//               name="password"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//               required
//             />
//             <label htmlFor="password">Password</label>
//             {formik.touched.password && formik.errors.password && (
//               <p className="text-danger">{formik.errors.password}</p>
//             )}
//           </div>
//           <button
//             disabled={!formik.dirty || !formik.isValid}
//             type="submit"
//             className="btn btn-primary mt-4"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;