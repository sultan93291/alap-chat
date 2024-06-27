"use client";
import React from "react";
import "./sidebar.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { VscHome } from "react-icons/vsc";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { GrLogout } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import firebaseConfig from "@/app/Config/firebaseConfig/firebaseConfig";
import { loggedInUser } from "@/app/Slice/AuthSlice";

const SideBar = () => {
  const [pathName, setpathName] = useState();
  const loggedInUserData = useSelector(state => state.user.value);
  const auth = getAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const handldeSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .then(() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("loggedinUser");
          dispatch(loggedInUser(null));
        }
      });
  };

  useEffect(() => {
    const pathName = window.location.pathname;
    setpathName(pathName);
  }, []);

  return (
    <div className="sidebar">
      <div className="img-wrapper">
        <Avatar
          alt="Sultan "
          src={loggedInUserData?.photoURL}
          sx={{ width: 100, height: 100 }}
        />
      </div>
      <ul className="routes">
        <li>
          <Link
            className={pathName === "/home" ? "active-route" : ""}
            href={"/home"}
          >
            {" "}
            <VscHome
              className={pathName === "/home" ? "active-icon" : "icons"}
            />{" "}
          </Link>
        </li>
        <li>
          <Link
            className={pathName === "/chat" ? "active-route" : ""}
            href={"/chat"}
          >
            {" "}
            <AiFillMessage
              className={pathName === "/chat" ? "active-icon" : "icons"}
            />{" "}
          </Link>
        </li>
        <li>
          <Link
            className={pathName === "/notification" ? "active-route" : ""}
            href={"/notification"}
          >
            {" "}
            <IoMdNotificationsOutline
              className={pathName === "/notification" ? "active-icon" : "icons"}
            />{" "}
          </Link>
        </li>
        <li>
          <Link
            className={pathName === "/settings" ? "active-route" : ""}
            href={"/settings"}
          >
            {" "}
            <IoMdSettings
              className={pathName === "/settings" ? "active-icon" : "icons"}
            />{" "}
          </Link>
        </li>
        <li>
          <Link
            className={pathName === "/message" ? "active-route" : ""}
            href={"/message"}
          >
            {" "}
            <GrLogout
              onClick={handldeSignOut}
              className={pathName === "/" ? "active-icon" : "icons"}
            />{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
