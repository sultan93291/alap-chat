"use client";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { Alert, Button, Typography } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import SingleFriends_Groups from "../singleFriendsGroups/SingleFriends_Groups";
import "./friendsGroups.css";
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
const Friend_Group = ({ variant }) => {
  const [friends, setfriends] = useState([]);
  const loggedInUserData = useSelector(state => state.user.value);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/friends");
    let arr = [];
    onValue(starCountRef, snapShot => {
      snapShot.forEach(item => {
        if (item.val().senderUid !== loggedInUserData?.uid) {
          const user = { ...item.val() };
          const userInfo = {
            userName: user.senderName,
            userPhoto: user.senderPhotoUrl,
            userEmail: user.senderEmail,
            userId: user.senderUid,
            key: item.key,
          };
          arr.push(userInfo);
        } else if (item.val().reciverUid !== loggedInUserData?.uid) {
          const user = { ...item.val() };
          const userInfo = {
            userName: user.reciverName,
            userPhoto: user.reciverPhotoUrl,
            userEmail: user.reciverEmail,
            userId: user.reciverUid,
            key: item.key,
          };
          arr.push(userInfo);
        }
      });

      setfriends(arr);
    });
  }, []);

  const txt = "dummy txt";
  const time = "today , 8:56 pm";
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
        <div className="fd_wrapper">
          {friends.length > 0 ? (
            friends.map((user, index) => (
              <SingleFriends_Groups
                key={index}
                src={user.userPhoto}
                heading={user.userName}
                subHeading={user.txt}
                time={time}
              />
            ))
          ) : (
            <Alert severity="info">No friends</Alert>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Friend_Group;
