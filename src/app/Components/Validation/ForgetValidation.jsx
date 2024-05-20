import React from "react";
import * as Yup from "yup";

const ForgetValidation = Yup.object({
  email: Yup.string()
    .required("please enter your email adress")
    .email("Invalid email adress")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email format"
    ),
  
});

export default ForgetValidation;
