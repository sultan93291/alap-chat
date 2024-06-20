import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./singleRequest.css";

const SingleRequest = ({
  src,
  heading,
  subHeading,
  isBtn,
  onClick,
  msgClick,
}) => {
  const [path, setPath] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    setPath(path);
  }, []);

  const SingleUserCursor = {
    cursor: path == "/chat" ? "pointer" : "default",
  };

  return (
    <div className="req-details" onClick={msgClick} style={SingleUserCursor}>
      <div className="req-img">
        <div>
          <Avatar alt=" not found " src={src} sx={{ width: 70, height: 70 }} />
        </div>
        <div className="requ_info">
          <Typography variant="h6" component={"h6"}>
            {heading}
          </Typography>
          <Typography variant="p" component={"p"}>
            {subHeading}
          </Typography>
        </div>
      </div>
      {isBtn ? (
        <Button
          style={{ height: "37px", width: "87px", background: "#5F35F5" }}
          type="submit"
          variant="contained"
          onClick={onClick}
        >
          {" "}
          accept{" "}
        </Button>
      ) : null}
    </div>
  );
};

export default SingleRequest;
