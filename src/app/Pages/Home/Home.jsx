import React from "react";
import SideBar from "@/app/Components/sidebar/sidebar";
import "./home.css";
import SearchBar from "@/app/Components/Cards/SearchBar/SearchBar";
import Users_Blocked from "@/app/Components/Cards/Users_Blocked/Users_List/Users_List";
import Friend_Group from "@/app/Components/Cards/friendsGroups/Friend_Groups/Friend_Groups";
import RequestComponents from "@/app/Components/Cards/RequestComponents/RequestComponents/RequestComponents";
import Users_List from "@/app/Components/Cards/Users_Blocked/Users_List/Users_List";
import BlockList from "@/app/Components/Cards/Users_Blocked/Block_List/BlockList";

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
          <Users_List variant={"users list"} />
          <BlockList variant={"blocked users"} block={true} />
        </div>
      </div>
    </section>
  );
};

export default Home;
