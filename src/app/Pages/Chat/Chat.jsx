import React from "react";
import "./chat.css"

import SearchBar from "@/app/Components/Cards/SearchBar/SearchBar";
import SideBar from "@/app/Components/sidebar/sidebar";
import Friends_Groups_Components from "@/app/Components/Cards/Friends_Groups_Componenet/Friends_Groups_Components";
import ChatBox from "@/app/Components/Cards/ChatBox/ChatBox";
ChatBox
const Chat = () => {
  return (
    <section className="container">
      <SideBar />
      <div className="components_wrapper">
        <div className="chats_wrapper">
          <SearchBar />
          <Friends_Groups_Components requName={"groups"} isBtn={false} />
          <Friends_Groups_Components requName={" friends"} isBtn={false} />
        </div>
        <ChatBox/>
      </div>
    </section>
  );
};

export default Chat;
