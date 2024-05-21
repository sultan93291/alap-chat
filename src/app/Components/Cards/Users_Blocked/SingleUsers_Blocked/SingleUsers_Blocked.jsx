import React from "react";
import "./SingleUsers_Blocke.css";
import { Avatar, Button, Typography } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
const SingleUsers_Blocked = ({ src, heading, time, block, onClick }) => {
  const handleUserReq = () => {
    alert("working");
  };
  return (
    <div className="user-details">
      <div className="user-img">
        <div>
          <Avatar alt=" not found " src={src} sx={{ width: 52, height: 52 }} />
        </div>
        <div className="user_info">
          <Typography variant="h6" component={"h6"}>
            {heading}
          </Typography>
          <Typography variant="p" component={"p"}>
            {time}
          </Typography>
        </div>
      </div>
      {block ? (
        <Button
          style={{ height: "30px", width: "99px", background: "#5F35F5" }}
          type="submit"
          variant="contained"
        >
          unblock
        </Button>
      ) : (
        <div className="users_add" onClick={onClick}>
          <IoIosAdd className="add" />
        </div>
      )}
    </div>
  );
};

export default SingleUsers_Blocked;
