import React from "react";

import Box from "@mui/material/Box";

import { Button, Typography } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import SingleFriends_Groups from "../singleFriendsGroups/SingleFriends_Groups";
import "./friendsGroups.css"

const Friend_Group = ({ variant }) => {
  const txt = "dummy txt";
  const time = "today , 8:56 pm";
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
        <div className="fd_wrapper">
          {dummyUsers.map((user, index) => (
            <SingleFriends_Groups
              key={index}
              src={user.img}
              heading={user.name}
              subHeading={user.txt}
              time={time}
            />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Friend_Group;
