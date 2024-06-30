"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./profile.css";
import { IoCamera } from "react-icons/io5";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";
import firebaseConfig from "@/app/Config/firebaseConfig/firebaseConfig";

const Page = () => {
  const { id } = useParams();
  const loggedInUserData = useSelector(state => state.user.value);
  const [User, setUser] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/users");
    onValue(starCountRef, snapShot => {
      let user = null;
      snapShot.forEach(item => {
        if (item.key == id) {
          user = { ...item.val(), id: item.key };
        }
      });
      setUser(user);
    });
  }, [id]);

  const isauthorizedUser = loggedInUserData.uid == id;

  return (
    <div className="profile_wrapper">
      <div className="cover_photo">
        <Image src={"/hero.jpg"} alt="none" height={100} width={100} />
        {isauthorizedUser && (
          <div className="cover_uploader">
            <IoCamera />
            <p>Edit cover photo</p>
          </div>
        )}
      </div>
      <div className="profile_photo_wrapper">
        <div className="profile_photo">
          <div className="ring">
            <Avatar
              alt="Sultan "
              src={User?.photoUrl}
              sx={{ width: 200, height: 200 }}
            />
          </div>
          {isauthorizedUser && (
            <div className="profile_uploader">
              <IoCamera />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
