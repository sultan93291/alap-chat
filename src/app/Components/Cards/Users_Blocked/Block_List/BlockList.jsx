"use client";
import React, { useState, useEffect } from "react";
import "../Users_List/Users_Blocked.css";
import Box from "@mui/material/Box";

import { Button, Typography } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import SingleUsers_Blocked from "../SingleUsers_Blocked/SingleUsers_Blocked";
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  push,
} from "firebase/database";
import firebaseConfig from "@/app/Config/firebaseConfig/firebaseConfig";
import { useSelector } from "react-redux";

const BlockList = ({ variant, block }) => {
  const loggedInUserData = useSelector(state => state.user.value);

  

  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/users");
    let arr = [];
    onValue(starCountRef, snapShot => {
      snapShot.forEach(item => {
        if (item.key !== loggedInUserData?.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });

      setUsers(arr);
    });
  }, []);

  const handleUserReq = userData => {
    const db = getDatabase();
    set(push(ref(db, "fdRequInfo")), {
      senderName: loggedInUserData.displayName,
      senderEmail: loggedInUserData.email,
      senderPhotoUrl: loggedInUserData?.photoURL,
      senderUid: loggedInUserData.uid,
      reciverName: userData.userName,
      reciverEmail: userData.email,
      reciverPhotoUrl: userData.photoUrl,
      reciverUid: userData.userId,
    });
  };
  const txt = "dummy txt";
  const time = "today , 8:56pm ";
  const dummyUsers = [
    { name: "goodenough", txt: txt, img: "/sultan.jpg" },
    { name: "dekhtechi", txt: txt, img: "/sultan.jpg" },
    { name: "jai hok", txt: txt, img: "/sultan.jpg" },
    { name: "kando", txt: txt, img: "/sultan.jpg" },
    { name: "elahi", txt: txt, img: "/sultan.jpg" },
    { name: "john doe", txt: txt, img: "/sultan.jpg" },
    { name: "john", txt: txt, img: "/sultan.jpg" },
  ];
  return (
    <div className="group-box">
      <Box>
        <div className="heading-wrapper">
          <Typography variant="p" component="p">
            {variant}
          </Typography>
          <HiOutlineDotsVertical className="dot" />
        </div>
        <div className="users_wrapper">
          {dummyUsers.map((user, index) => (
            <SingleUsers_Blocked
              key={index}
              src={"/sultan.jpg"}
              heading={user.name}
              time={time}
              block={block}
              onClick={() => handleUserReq(user)}
            />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default BlockList;
