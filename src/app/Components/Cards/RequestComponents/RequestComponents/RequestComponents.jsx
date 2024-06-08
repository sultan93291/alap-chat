"use client";
import Box from "@mui/material/Box";
import "./request.css";
import { Button, Typography } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Avatar from "@mui/material/Avatar";
import SingleRequest from "../SingleRequest/SingleRequest";
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
import { useEffect, useState } from "react";

const RequestComponents = ({ requName, isBtn }) => {
  const loggedInUserData = useSelector(state => state.user.value);
  const [fdRequest, setfdRequest] = useState([]);
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/fdRequInfo");
    let arr = [];
    onValue(starCountRef, snapShot => {
      snapShot.forEach(item => {
        if (item.val().reciverUid !== loggedInUserData?.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });

      setfdRequest(arr);
    });
  }, []);

  const handleAccept = (request) => {
    console.log(request)
  }
 
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
    <div
      className={requName === "group request" ? "request-box" : "fd_request"}
    >
      <Box>
        <div className="heading-wrapper">
          <Typography variant="p" component="p">
            {requName}
          </Typography>
          <HiOutlineDotsVertical className="dot" />
        </div>
        <div className="master_wrapper">
          {fdRequest.map((user, index) => (
            <SingleRequest
              key={index}
              src={user.reciverPhotoUrl}
              heading={user.reciverName}
              subHeading={"dummy"}
              isBtn={isBtn}
              onClick={()=>handleAccept(user)}
            />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default RequestComponents;
