import React from "react";
import "./custom-button.css";
import { Colors } from "../../assets/colors/colors";

export const CustomButton = ({ handleSubmit, buttonTitle, buttonIcon }) => {
  return (
    <div className="customButtonMainDiv">
      <button
        style={{ backgroundColor: Colors.PURPLE, color: Colors.WHITE }}
        className="customButton"
        onClick={handleSubmit}
        type="submit"
      >
        {buttonTitle}
        {buttonIcon ? (
          <img src={buttonIcon} className="custtomButtonIcon" />
        ) : null}
      </button>
    </div>
  );
};
