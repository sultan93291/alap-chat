import React from "react";
import Box from "@mui/material/Box";
import "./request.css";
import { Button, Typography } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Avatar from "@mui/material/Avatar";
import SingleRequest from "../SingleRequest/SingleRequest";

const RequestComponents = ({ requName , isBtn }) => {
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
    <div className={requName === "group request" ?"request-box" : "fd_request"}>
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

export default RequestComponents;
