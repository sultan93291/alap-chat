import React from "react";
import SideBar from "@/app/Components/sidebar/sidebar";
import "./home.css";
import SearchBar from "@/app/Components/Cards/SearchBar/SearchBar";
import Users_Blocked from "@/app/Components/Cards/Users_Blocked/Users_Blocked/Users_Blocked";
import Friend_Group from "@/app/Components/Cards/friendsGroups/Friend_Groups/Friend_Groups";
import RequestComponents from "@/app/Components/Cards/RequestComponents/RequestComponents/RequestComponents";

const Home = () => {
  return (
    <section className="container">
      <SideBar />
      <div className="components_wrapper">
        <div className="chats_wrapper">
          <SearchBar />
          <RequestComponents requName={"group request"} isBtn={true} />
          <RequestComponents requName={" friend request"} isBtn={true} />
        </div>
        <div className="fd_grp_wrapper">
          <Friend_Group variant={"friends"} />
          <Friend_Group variant={"my groups"} />
        </div>
        <div className="users_block_wrapper">
          <Users_Blocked variant={"users list"} />
          <Users_Blocked variant={"blocked usrs"} block={true} />
        </div>
      </div>
    </section>
  );
};

export default Home;
