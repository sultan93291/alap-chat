"use client";
import React, { useState, useEffect } from "react";
import "./Users_Blocked.css";
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
import { handleBreakpoints } from "@mui/system";

const Users_List = ({ variant, block }) => {
  const loggedInUserData = useSelector(state => state.user.value);

  const [Users, setUsers] = useState([]);

  const [fdRequest, setfdRequest] = useState([]);

  const HandleUserReq = userData => {
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
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/fdRequInfo");
    let arr = [];

    onValue(starCountRef, snapShot => {
      snapShot.forEach(item => {
        if (
          item.val().senderUid !== loggedInUserData?.uid &&
          item.val().reciverUid !== loggedInUserData?.uid
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });

      setfdRequest(arr);
    });
  }, [HandleUserReq]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/users");
    const starCountRef1 = ref(db, "/fdRequInfo");
    let arr1 = [];
    onValue(starCountRef1, snapShot => {
      snapShot.forEach(item => {
        arr1.push({ ...item.val(), id: item.key });
      });
    });

    let arr = [];
    onValue(starCountRef, snapShot => {
      snapShot.forEach(item => {
        if (item.key !== loggedInUserData?.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      let filteredArr = [];
      arr.map((item, index) => {
        if (arr1.length > 0) {
          arr1.map((requ, index) => {
            if (
              item.userId !== requ.reciverUid &&
              item.userId !== requ.senderUid
            ) {
              filteredArr.push({ ...item });
            }
          });
          setUsers(filteredArr);
        } else {
          setUsers(arr);
        }
      });
    });
  }, [HandleUserReq]);

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
          {Users.map((user, index) => (
            <SingleUsers_Blocked
              key={index}
              src={user.photoUrl}
              heading={user.userName}
              time={time}
              block={block}
              onClick={() => HandleUserReq(user)}
            />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Users_List;
