import React from "react";
import "./SearchBar.css";
import { IoSearch } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
const SearchBar = () => {
  return (
    <div className="serach_bar">
      <IoSearch className="search" />
      <input id="password" type="text" name="password" placeholder="search" />
      <HiOutlineDotsVertical className="dot" />
    </div>
  );
};

export default SearchBar;
