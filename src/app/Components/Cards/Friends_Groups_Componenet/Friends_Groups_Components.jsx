"use client";
import React, { useState, useEffect } from "react";
import SingleRequest from "../RequestComponents/SingleRequest/SingleRequest";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Alert, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./Friends_Groups.css";
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


const Friends_Groups_Components = ({ requName, isBtn }) => {
  const [Users, setUsers] = useState([]);
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



  return (
    <div className={requName === "groups" ? "request-box" : "fd_request"}>
      <Box>
        <div className="heading-wrapper">
          <Typography variant="p" component="p">
            {requName}
          </Typography>
          <HiOutlineDotsVertical className="dot" />
        </div>
        <div className="master_wrapper">
          {friends.length > 0 ? (
            friends.map((user, index) => (
              <SingleRequest
                key={index}
                src={user.userPhoto}
                heading={user.userName}
                subHeading={null}
                isBtn={isBtn}
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

export default Friends_Groups_Components;
