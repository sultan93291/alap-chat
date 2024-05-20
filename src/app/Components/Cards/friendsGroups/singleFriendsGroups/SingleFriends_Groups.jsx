import { Avatar, Button, Typography } from "@mui/material";
import "./singleFriends.css";
const SingleFriends_Groups = ({ src, heading, subHeading, time }) => {
  return (
    <div className="fd-details">
      <div className="fd-img">
        <div>
          <Avatar alt=" not found " src={src} sx={{ width: 52, height: 54 }} />
        </div>
        <div className="fd_info">
          <Typography variant="h6" component={"h6"}>
            {heading}
          </Typography>
          <Typography variant="p" component={"p"}>
            {subHeading}
          </Typography>
        </div>
      </div>
      <Typography variant="p" component={"p"}>
        {time}
      </Typography>
    </div>
  );
};

export default SingleFriends_Groups;
