import React from "react";
import "./SingleUsers_Blocke.css";
import { Avatar, Button, Typography } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
const SingleUsers_Blocked = ({
  src,
  heading,
  time,
  block,
  onClick,
  isRequSent,
  isbtn,
}) => {
 
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
      ) :  isbtn ? (
        isRequSent ? (
          <div className="users_add" onClick={onClick}>
            <IoMdClose className="add" />
          </div>
        ) : (
          <div className="users_add" onClick={onClick}>
            <IoIosAdd className="add" />
          </div>
        )
      ) : (
        <p style={ {fontSize:"12px"}} >already friend</p>
      )}
    </div>
  );
};

export default SingleUsers_Blocked;
