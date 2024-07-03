import React, { useState } from "react";
import "./custom-search-input-style.css";
import { Colors } from "../../assets/colors/colors";
import searchIcon from "../../assets/images/searchIcon.svg";

export const CustomSearchInput = ({searchValue,setSearchValue,onChangeSearch,plaseholder}) => {
 
  return (
    <div
      className="customSearchInputMainDiv"
      style={{ borderColor: Colors.LIGHT_GRAY_WITH_ALFA }}
    >
      <input placeholder={plaseholder} onChange={onChangeSearch} className="customSearchInput" />
      <img src={searchIcon} />
    </div>
  );
};
