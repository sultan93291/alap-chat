"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from "next/link";

import {
  FromContainer,
  CustomButton,
  Heading,
  CustomTextField,
} from "@/app/page";
import { useFormik } from "formik";
import RegisterValidation from "../Components/Validation/RegisterValidation";
import * as Yup from "yup";

import { getDatabase, ref, set, push } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import firebaseConfig from "../Config/firebaseConfig/firebaseConfig";
import { useState } from "react";
import { ColorRing, Puff } from "react-loader-spinner";
import Toast from "../Components/Toast/Toast";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const [Loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    name: "",
  };

  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      setLoading(true);
      const auth = getAuth();
      const db = getDatabase();

      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(usercredentials => {
          updateProfile(auth.currentUser, {
            displayName: values.name,
          }).then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              set(ref(db, "users/" + usercredentials.user.uid), {
                userName: usercredentials.user.displayName,
                email: usercredentials.user.email,
                emailVerified: usercredentials.user.emailVerified,
                photoUrl: usercredentials.user.photoURL,
                userId: usercredentials.user.uid,
              })
                .then(() => {
                  console.log(usercredentials);
                  setLoading(false);
                  toast("Successfully Registered");
                  setTimeout(() => {
                    router.push("/");
                  }, 3000);
                  actions.resetForm({
                    values: initialValues,
                  });
                })
                .catch(error => {
                  console.log(error);
                  setLoading(false);
                  toast("Email verification link sent failed");
                });
            });
          });
        })
        .then(() => {})
        .catch(error => {
          setLoading(false);
          toast("Email already in use");
        });
    },
    validationSchema: RegisterValidation,
  });
  return (
    <>
      <Toast />
      {Loading ? (
        <div className="loader">
          <Puff
            visible={true}
            height="120"
            width="120"
            color="#fff"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : null}
      <FromContainer>
        <Grid item xs={6}>
          <div className="Box_root">
            <form onSubmit={formik.handleSubmit} className="form_box">
              <div className="heading_wrapper">
                <Heading variant="h5" component="h5">
                  Get started with easily register
                </Heading>
                <Heading
                  style={{ fontSize: "20.641px", opacity: 0.5 }}
                  variant="span"
                  component="span"
                >
                  Free register and you can enjoy it
                </Heading>
              </div>
              <div className="inp_btn_wrapper">
                <div className="inp_Wrapper">
                  <div>
                    <CustomTextField
                      id="email"
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.touched && formik.errors.email ? (
                      <p> {formik.errors.email} </p>
                    ) : null}
                  </div>
                  <div>
                    <CustomTextField
                      id="name"
                      label="Full name"
                      variant="outlined"
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    {formik.touched && formik.errors.name ? (
                      <p> {formik.errors.name} </p>
                    ) : null}
                  </div>
                  <div>
                    <CustomTextField
                      id="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.touched && formik.errors.password ? (
                      <p> {formik.errors.password} </p>
                    ) : null}
                  </div>
                </div>
                <div className="btn_wrapper">
                  <CustomButton type="submit" variant="contained">
                    {" "}
                    sign up{" "}
                  </CustomButton>
                  <div className="link_wrapper">
                    <span className="txt_link">
                      Already have a account ?{" "}
                      <Link
                        href={"/"}
                        style={{ color: "#EA6C00", fontWeight: "700" }}
                      >
                        {" "}
                        Sign In{" "}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="img_box">
            <Image width={684} height={1024} src="/hero.jpg" alt="hero.jpg" />
          </div>
        </Grid>
      </FromContainer>
    </>
  );
};

export default Page;
