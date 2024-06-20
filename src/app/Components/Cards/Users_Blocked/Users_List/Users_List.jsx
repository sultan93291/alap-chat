"use client";
import React, { useState, useEffect, useCallback } from "react";
import "./Users_Blocked.css";
import Box from "@mui/material/Box";
import { CiMedicalCross } from "react-icons/ci";
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
  remove,
} from "firebase/database";
import firebaseConfig from "@/app/Config/firebaseConfig/firebaseConfig";
import { useSelector } from "react-redux";
import { handleBreakpoints } from "@mui/system";
import { Alert } from "@mui/material";

const Users_List = ({ variant, block }) => {
  const loggedInUserData = useSelector(state => state.user.value);
  const [Users, setUsers] = useState([]);
  const [fdRequest, setfdRequest] = useState([]);

  const HandleUserReq = useCallback(
    userData => {
      const db = getDatabase();
      set(push(ref(db, "fdRequInfo")), {
        senderName: loggedInUserData.displayName,
        senderEmail: loggedInUserData.email,
        senderPhotoUrl: loggedInUserData?.photoURL
          ? loggedInUserData?.photoURL
          : "null",
        senderUid: loggedInUserData.uid,
        reciverName: userData.userName,
        reciverEmail: userData.email,
        reciverPhotoUrl: userData.photoUrl ? userData.photoUrl : "null",
        reciverUid: userData.userId,
      });
    },
    [loggedInUserData]
  );
  const HandleCancelReq = useCallback(cancelReq => {
    const db = getDatabase();
    remove(ref(db, "fdRequInfo/" + cancelReq.requId)).then(() => {
      console.log("successfully deleted fd requ");
    });
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/users");
    const fdRequRef = ref(db, "/fdRequInfo");
    const fdRef = ref(db, "/friends");
    let arr = [];
    let fdRequArr = [];
    let allRequ = [];
    let requId = [];
    let fdArr = [];

    onValue(fdRef, snapShot => {
      snapShot.forEach(item => {
        fdArr.push({ ...item.val(), id: item.key });
      });
    });

    // Fetch all friend requests
    onValue(fdRequRef, snapShot => {
      allRequ = [];
      requId = [];
      snapShot.forEach(requ => {
        allRequ.push({ id: requ.key, ...requ.val() });
        if (loggedInUserData.uid == requ.val().senderUid) {
          requId.push(requ.val().senderUid + requ.val().reciverUid);
        } else if (loggedInUserData.uid == requ.val().reciverUid) {
          requId.push(requ.val().reciverUid + requ.val().senderUid);
        }
      });
      setfdRequest(requId);
      // Fetch all users
      onValue(starCountRef, snapShot => {
        arr = [];
        snapShot.forEach(item => {
          if (item.key !== loggedInUserData?.uid) {
            let isRequ = false;
            let requId = null;
            let isbtn = true;

            // Check if there is a matching friend request
            allRequ.forEach(requ => {
              if (item.key == requ.reciverUid) {
                isRequ = true;
                requId = requ.id;
                fdRequArr.push({ id: item.key });
              }
            });

            fdArr.forEach((fd, index) => {
              if (item.key == fd.reciverUid || item.key == fd.senderUid) {
                isbtn = false;
              }
            });

            arr.push({ ...item.val(), id: item.key, isRequ, requId, isbtn });
          }
        });
        setUsers(arr);
      });
    });
  }, [loggedInUserData, HandleCancelReq, HandleUserReq]);

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
          {Users.length > 0 ? (
            Users.map((user, index) => {
              return (
                <SingleUsers_Blocked
                  key={index}
                  src={user.photoUrl}
                  heading={user.userName}
                  time={time}
                  block={block}
                  isbtn={user.isbtn}
                  onClick={
                    fdRequest.includes(loggedInUserData.uid + user.id) ||
                    fdRequest.includes(user.id + loggedInUserData.uid)
                      ? () => HandleCancelReq(user)
                      : () => HandleUserReq(user)
                  }
                  isRequSent={
                    fdRequest.includes(loggedInUserData.uid + user.id) ||
                    fdRequest.includes(user.id + loggedInUserData.uid)
                      ? true
                      : false
                  }
                />
              );
            })
          ) : (
            <Alert severity="info">No Users Available</Alert>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Users_List;
