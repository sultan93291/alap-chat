"use client";
import React, { useState, useEffect, useCallback } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { msgReciver } from "@/app/Slice/msgReciverSlice";

const Friends_Groups_Components = ({ requName, isBtn }) => {
  const [Users, setUsers] = useState([]);
  const [friends, setfriends] = useState([]);
  const loggedInUserData = useSelector(state => state.user.value);
  const msgUserData = useSelector(state => state.msgReciverInfo.value);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/friends");
    let arr = [];
    onValue(starCountRef, snapShot => {
      snapShot.forEach(item => {
        if (
          item.val().senderUid !== loggedInUserData?.uid &&
          item.val().reciverUid == loggedInUserData.uid
        ) {
          const user = { ...item.val() };
          const userInfo = {
            userName: user.senderName,
            userPhoto: user.senderPhotoUrl,
            userEmail: user.senderEmail,
            userId: user.senderUid,
            key: item.key,
          };
          arr.push(userInfo);
        } else if (
          item.val().reciverUid !== loggedInUserData?.uid &&
          item.val().senderUid == loggedInUserData.uid
        ) {
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
  }, [loggedInUserData, handleMsgClick]);

  const handleMsgClick = useCallback(
    msgUser => {
      dispatch(msgReciver(msgUser));
    },
    [msgUser]
  );

  setTimeout(() => {
    console.log(msgUserData);
  }, 3000);

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
                msgClick={() => handleMsgClick(user)}
              />
            ))
          ) : (
            <Alert severity="info">NO Friends</Alert>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Friends_Groups_Components;
