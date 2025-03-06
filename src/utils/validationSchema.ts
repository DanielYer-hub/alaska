import * as yup from "yup";

export const validationSchema = yup.object({
  first: yup.string().min(2).max(256).required(),
      middle: yup.string().min(2).max(256),
      last: yup.string().min(2).max(256).required(),
      phone: yup.string().min(9).max(11).required(),
      email: yup.string().email().min(5).required(),
      password: yup
        .string()
        .min(7)
        .max(20)
        .required()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-"])[A-Za-z\d!@#$%^&*\-"]{8,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-"), and be at least 8 characters long'
        ),
      image: yup.string().min(14),
      alt: yup.string().min(2).max(256),
      state: yup.string().min(2).max(256),
      country: yup.string().min(2).max(256).required(),
      city: yup.string().min(2).max(256).required(),
      street: yup.string().min(2).max(256).required(),
      houseNumber: yup.number().min(2).max(256).required(),
      zip: yup.number().min(2).max(1000000).required(),
      isBusiness: yup.boolean().required(),
});


