"use client";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "./chatbox.css";
import { IoIosAdd } from "react-icons/io";
import { Avatar, Button, Typography } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { BsSendFill } from "react-icons/bs";

const ChatBox = () => {
  const [msg, setmsg] = useState();
  const handleMsgData = e => {
    setmsg(e.target.value);
  };



  const msgUserData = useSelector(state => state.msgReciverInfo.value);

  return (
    <div className="chatbox">
      <Box>
        {msgUserData ? (
          <>
            <div className="user-details">
              <div className="user-img">
                <div>
                  <Avatar
                    alt=" not found "
                    src={msgUserData.userPhoto}
                    sx={{ width: 75, height: 75 }}
                  />
                </div>
                <div className="user_info">
                  <Typography variant="h6" component={"h6"}>
                    {msgUserData.userName}
                  </Typography>
                  <Typography variant="p" component={"p"}>
                    online
                  </Typography>
                </div>
              </div>
              <HiOutlineDotsVertical className="dot" />
            </div>
            <div className="chatBox_wrapper" style={{ height: "80%" }}></div>
            <div className=" inputBox_wrapper ">
              <div className="input_wrapper">
                <input
                  type="text"
                  onChange={e => {
                    handleMsgData(e);
                  }}
                  placeholder="Type a message"
                />
                <div className="logo_wrapper">
                  <MdOutlineEmojiEmotions />
                  <CiCamera />
                </div>
              </div>
              <div className="send_btn">
                <BsSendFill />
              </div>
            </div>
          </>
        ) : (
          <Alert severity="info"> please select a user</Alert>
        )}
      </Box>
    </div>
  );
};

export default ChatBox;
