import * as yup from "yup";

export const validationSchema = yup.object({
 title: yup.string().min(2).max(256).required(),
      subtitle: yup.string().min(2).max(256).required(),
      description: yup.string().min(2).max(1024).required(),
      phone: yup.string().min(9).max(11).required(),
      email: yup.string().email().min(5).required(),
      url: yup.string().min(14),
      alt: yup.string().min(2).max(256),
      state: yup.string(),
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      houseNumber: yup.number().min(1).required(),
      zip: yup.number().required(),
})