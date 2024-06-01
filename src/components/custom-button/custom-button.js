import React from "react";
import "./custom-button.css";
import { Colors } from "../../assets/colors/colors";
import { CustomSpin } from "../custom-spin/custom-spin";

export const CustomButton = ({
  handleSubmit,
  buttonTitle,
  buttonIcon,
  loading,
}) => {
  return (
    <div className="customButtonMainDiv">
      <button
        style={{ backgroundColor: Colors.PURPLE, color: Colors.WHITE }}
        className="customButton"
        onClick={handleSubmit}
        type="submit"
      >
        <p>{buttonTitle}</p>
        {loading && <CustomSpin color={Colors.WHITE} size={20} />}
        {/* {buttonIcon ? (
          <img src={buttonIcon} className="custtomButtonIcon" />
        ) : null} */}
      </button>
    </div>
  );
};
