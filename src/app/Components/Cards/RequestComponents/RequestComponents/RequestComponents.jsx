"use client";
import Box from "@mui/material/Box";
import "./request.css";
import { Alert, Button, Typography } from "@mui/material";
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
  remove,
} from "firebase/database";
import firebaseConfig from "@/app/Config/firebaseConfig/firebaseConfig";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";

const RequestComponents = ({ requName, isBtn }) => {
  const loggedInUserData = useSelector(state => state.user.value);
  const [fdRequest, setfdRequest] = useState([]);
  const [Trigger, setTrigger] = useState(false);

  const handleAccept = useCallback(request => {
    console.log(request);
    const db = getDatabase();
    set(push(ref(db, "friends")), {
      senderName: request.senderName,
      senderEmail: request.senderEmail,
      senderPhotoUrl: request.senderPhotoUrl,
      senderUid: request.senderUid,
      reciverName: request.reciverName,
      reciverEmail: request.reciverEmail,
      reciverPhotoUrl: request.reciverPhotoUrl,
      reciverUid: request.reciverUid,
    }).then(() => {
      remove(ref(db, "fdRequInfo/" + request.id)).then(() => {
        console.log("successfully deleted fd requ");
      });
      setTrigger(prev => !prev);
      console.log("successfully added to fd list");
    });
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/fdRequInfo");
    const starCountRefFd = ref(db, "/friends");
    const fdArr = [];
    onValue(starCountRefFd, snapShot => {
      snapShot.forEach(item => {
        console.log(item.val());
        fdArr.push({ ...item.val(), id: item.key });
      });
    });

    let arr = [];
    onValue(starCountRef, snapShot => {
      snapShot.forEach(item => {
        console.log(item.val().reciverUid);
        if (item.val().reciverUid == loggedInUserData?.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setfdRequest(arr);
    });
  }, [Trigger, loggedInUserData]);

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
          {fdRequest.length > 0 ? (
            fdRequest.map((user, index) => (
              <SingleRequest
                key={index}
                src={user.senderPhotoUrl}
                heading={user.senderName}
                subHeading={"dummy"}
                isBtn={isBtn}
                onClick={() => handleAccept(user)}
              />
            ))
          ) : (
            <Alert severity="info">No Request </Alert>
          )}
        </div>
      </Box>
    </div>
  );
};

export default RequestComponents;
