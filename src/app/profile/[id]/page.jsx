"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./profile.css";
import { IoCamera } from "react-icons/io5";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref, update } from "firebase/database";
import firebaseConfig from "@/app/Config/firebaseConfig/firebaseConfig";
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

const Page = () => {
  const { id } = useParams();
  const loggedInUserData = useSelector(state => state.user.value);
  const [User, setUser] = useState("");
  const [image, setimage] = useState("");

  const handleImage = e => {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
    }
  };

  const handleProfileUpdate = () => {
    const storage = getStorage();
    const db = getDatabase();
    if (image) {
      const imageStorageRef = sref(storage, "images/" + `${image.name}`);
      uploadBytes(imageStorageRef, image).then(snapshot => {
        getDownloadURL(imageStorageRef).then(downloadURL => {
          if (downloadURL) {
            update(ref(db, "users/" + User.userId), {
              photoUrl: downloadURL,
            }).then(() => {
              setimage("");
            });
          } else {
            console.log("Couldn't upload image");
          }
        });
      });
    }
  };

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
        <Image src={"/hero.jpg"} alt="none" height={100} width={100} priority />
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
              <div onClick={handleProfileUpdate} className="profile_input_logo">
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={handleImage}
                />
                <IoCamera />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="info_wrapper">
        <p className="infor_name_wrapper">{User.userName}</p>
      </div>
    </div>
  );
};

export default Page;
