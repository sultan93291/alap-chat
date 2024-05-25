"use client";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";


import * as Yup from "yup";
import loginValidation from "./Components/Validation/loginValidation";
import "./globals.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ImCross } from "react-icons/im";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { update, ref, set, push, getDatabase } from "firebase/database";
import firebaseConfig from "./Config/firebaseConfig/firebaseConfig";
import ForgetValidation from "./Components/Validation/ForgetValidation";
import Toast from "./Components/Toast/Toast";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUser } from "./Slice/AuthSlice";

export const Heading = styled(Typography)({
  fontSize: "34.401px",
  color: "#11175D",
  fontWeight: "700",
  fontFamily: ' "Nunito", sans-serif',
});

export const FromContainer = styled("section")`
  height: 1024px;
  width: 1440px;
  display: flex;
  flex-direction: row;
  gap: 69px;
  margin: 0 auto;
`;

export const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "81.73px",
    width: "368.09px",
    backgroundColor: "#fff",
    padding: "0 55px",
    color: "#11175D",
    fontSize: "20.641px",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#11175D",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#11175D",
    borderRadius: "8.6px",
    fontSize: "13.67px",
    color: "#fff",
    opacity: "0.3",
  },
  "& .MuiInputLabel-root": {
    color: "#11175D",
    fontSize: "16px",
    "&.MuiInputLabel-shrink": {
      fontSize: "13.76px",
      color: "#11175D",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  rowGap: 5,
  alignItems: "center",
};

export const CustomButton = styled(Button)({
  height: "67.492px",
  width: "368px",
  borderRadius: "86.033px",
  backgroundColor: "#5f34f5",
  color: "#fff",
  fontSize: "20px",
});

export default function Home() {
  const authValue = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlelogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const db = getDatabase();
    let user;
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        user = result.user;

        set(ref(db, "users/" + user.uid), {
          userName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoUrl: user.photoURL,
          userId: user.uid,
        });
      })
      .then(() => {
        toast("Login success");
        localStorage.setItem("loggedinUser", JSON.stringify(user));
        dispatch(loggedInUser(user));
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const FrogFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values, actions) => {
      const auth = getAuth();
      const email = values.email;
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          toast("Success password reset");
          actions.resetForm();
        })
        .catch(error => {
          toast("Error reset password");
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
    },
    validationSchema: ForgetValidation,
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      const auth = getAuth();
      const db = getDatabase();
      setLoading(true);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(userCredentials => {
          update(ref(db, "users/" + userCredentials.user.uid), {
            emailVerified: userCredentials.user.emailVerified,
          }).then(() => {
            if (userCredentials.user.emailVerified) {
              const user = userCredentials;
              toast("Login success");
              if (typeof window !== "undefined") {
                localStorage.setItem("loggedinUser", JSON.stringify(user));
                dispatch(loggedInUser(user));
              }
              setTimeout(() => {
                router.push("/home");
              }, 2000);
            } else {
              toast("Please verify your email adress");
            }

            setLoading(false);
            actions.resetForm({
              values: initialValues,
            });
          });
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          toast("Invalid credentials");
        });
    },
    validationSchema: loginValidation,
  });

  return (
    <>
      <Toast />
      <FromContainer>
        <Grid item xs={6}>
          <div className="Box_root">
            <form onSubmit={formik.handleSubmit} className="form_box">
              <div className="login_heading_wrapper">
                <Heading variant="h5" component="h5">
                  Login to your account!
                </Heading>
                <div onClick={handlelogin} className="login_img_wrapper">
                  <Image
                    width={19.263}
                    height={19.263}
                    src={"/google.png"}
                    alt="google image"
                  />
                  <Typography
                    style={{
                      color: "#11175D",
                      fontFamily: '"Nunito", sans-serif',
                      fontWeight: 700,
                    }}
                    id="modal-modal-title"
                    variant="p"
                    component="p"
                    className="google"
                  >
                    Login with Google
                  </Typography>
                </div>
              </div>
              <div className="inp_btn_wrapper">
                <div className="loginInp_Wrapper">
                  <div>
                    <TextField
                      id="email"
                      label="Email Address"
                      variant="standard"
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
                    <TextField
                      id="password"
                      label="password"
                      variant="standard"
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
                <div className="login_btn_wrapper">
                  <Button disabled={Loading} type="submit" variant="contained">
                    {Loading ? (
                      <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#fff"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      " Login to Continue "
                    )}
                  </Button>
                  <div className="link_wrapper">
                    <span className="txt_link">
                      {" Don't  have a account ? "}
                      <Link
                        href={"/register"}
                        style={{ color: "#EA6C00", fontWeight: "700" }}
                      >
                        {" "}
                        Sign up{" "}
                      </Link>
                    </span>
                    <p onClick={() => handleOpen()}>forgot password ?</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="img_box">
            <Image width={684} height={1024} src="/phone.jpg" alt="phone.jpg" />
          </div>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              style={{
                color: "#11175D",
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 700,
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Enter Your Email Adress
            </Typography>
            <form
              onSubmit={FrogFormik.handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                rowGap: "45px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  style={{ width: "80%" }}
                  id="email"
                  label="email"
                  variant="outlined"
                  type="email"
                  name="email"
                  onChange={FrogFormik.handleChange}
                  value={FrogFormik.values.email}
                />
                {FrogFormik.touched && FrogFormik.errors.email ? (
                  <p
                    style={{ marginTop: "20px", color: "red", fontWeight: 500 }}
                  >
                    {" "}
                    {FrogFormik.errors.email}{" "}
                  </p>
                ) : null}
              </div>
              <Button
                style={{ height: "60px", width: "180px" }}
                type="submit"
                variant="contained"
              >
                {" "}
                query email{" "}
              </Button>
              <ImCross onClick={() => handleClose()} className="cross" />
            </form>
          </Box>
        </Modal>
      </FromContainer>
    </>
  );
}
