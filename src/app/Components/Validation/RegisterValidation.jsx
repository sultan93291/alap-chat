import React from "react";
import * as Yup from "yup";

const RegisterValidation = Yup.object({
  email: Yup.string()
    .required("please enter your email adress")
    .email("Invalid email adress")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email format"
    ),
  password: Yup.string()
    .required("please enter your password")
    .min(8, "password must be min 8 char")
    .max(32, "password can't be more than 32 char ")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/,
      "invalid password format"
    ),
  name: Yup.string()
    .required("please add your full name")
    .matches(
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      "invalid name signature"
    ),
});

export default RegisterValidation;
