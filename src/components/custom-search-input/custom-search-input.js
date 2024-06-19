import React, { useState } from "react";
import "./custom-search-input-style.css";
import { Colors } from "../../assets/colors/colors";
import searchIcon from "../../assets/images/searchIcon.svg";

export const CustomSearchInput = ({searchValue,setSearchValue}) => {
 const onChange = (e) =>{
  setSearchValue(e.target.value)
 }
  return (
    <div
      className="customSearchInputMainDiv"
      style={{ borderColor: Colors.LIGHT_GRAY_WITH_ALFA }}
    >
      <input placeholder="Search ID, name, device ID, email, phone number" onChange={onChange} className="customSearchInput" />
      <img src={searchIcon} />
    </div>
  );
};
