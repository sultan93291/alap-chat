"use client";
import { Box } from "@mui/system";
import React from "react";
import "./chatbox.css";
import { IoIosAdd } from "react-icons/io";
import { Avatar, Button, Typography } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const ChatBox = () => {
  const msgUserData = useSelector(state => state.msgReciverInfo.value);
  console.log(msgUserData);
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
                    {
                      msgUserData.userName
                    }
                  </Typography>
                  <Typography variant="p" component={"p"}>
                    online
                  </Typography>
                </div>
              </div>
              <HiOutlineDotsVertical className="dot" />
            </div>
            <div className="chatBox_wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="300"
                height="auto"
                viewBox="0 0 205 57"
                fill="none"
              >
                <rect x="11" width="194" height="50" rx="10" fill="#F1F1F1" />
                <text
                  className="svg_text"
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  fill="black"
                  font-size="16"
                >
                  hello world Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Inventore natus optio qui quos ea quibusdam dolore
                  tempora asperiores velit. Nihil distinctio tempore alias iusto
                  dolore quos natus expedita nobis quisquam.
                </text>
                <path
                  d="M13.2991 31.7496C14.0809 30.4858 15.9191 30.4858 16.7009 31.7496L26.1024 46.9479C26.9266 48.2803 25.9682 50 24.4015 50H5.59852C4.0318 50 3.07343 48.2803 3.89764 46.9479L13.2991 31.7496Z"
                  fill="#F1F1F1"
                />
              </svg>
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
