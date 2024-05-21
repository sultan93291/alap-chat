"use client";
import React, { useState, useEffect } from "react";
import SingleRequest from "../RequestComponents/SingleRequest/SingleRequest";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./Friends_Groups.css";


const Friends_Groups_Components = ({ requName, isBtn }) => {
  const [Users, setUsers] = useState([]);
  const txt = "dummu txt";
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
    <div className={requName === "groups" ? "request-box" : "fd_request"}>
      <Box>
        <div className="heading-wrapper">
          <Typography variant="p" component="p">
            {requName}
          </Typography>
          <HiOutlineDotsVertical className="dot" />
        </div>
        <div className="master_wrapper">
          {dummyUsers.map((user, index) => (
            <SingleRequest
              key={index}
              src={user.img}
              heading={user.name}
              subHeading={user.txt}
              isBtn={isBtn}
            />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Friends_Groups_Components;
