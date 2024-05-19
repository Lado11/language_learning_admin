import React from "react";
import "./feedback-screen-card-item-style.css";
import { Colors } from "../../../assets/colors/colors";
import userIcon from "../../../assets/images/userCardIcon.svg";

export const FeedbackScreenCardItem = () => {
  return (
    <div
      className="feedbackCardItem"
      style={{ borderColor: Colors.BACKGROUND_COLOR }}
    >
      <div className="feedbackCardItemSubDiv">
        <div
          style={{ backgroundColor: Colors.LIGHT_GREEN }}
          className="customCardTileImage"
        >
          <img src={userIcon} />
        </div>
        <div>
          <p>Jenny Wilson</p>
          <p>Lorem ipsum dolor sit amet, consectetur permi...</p>
        </div>
      </div>
      <div
        style={{ backgroundColor: Colors.LIGHT_GREEN }}
        className="feedbackIdDiv"
      >
        <p className="feedbackId" style={{ color: Colors.GREEN }}>
          ID 123456789
        </p>
      </div>
    </div>
  );
};
