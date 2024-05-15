import React from "react";
import "./learning-language-screen-style.css";
import { Colors } from "../../assets/colors/colors";
import { CustomAddNew } from "../../components/custom-add-new/custom-add-new";
import { LearningLanguageItemCard } from "./components/learning-laguage-item-card";
import { CustomPagination } from "../../components";
import { useNavigate } from "react-router-dom";

export const LearningLanguageScreen = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const navigate = useNavigate();

  const navigateToCreateScreen = () => {
    navigate("/learning-language-create");
  };

  return (
    <div
      className="learningLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div className="learningLanguageScreenSubDiv">
        <div className="learningLanguageScreenAddNewDiv">
          <CustomAddNew
            title={"Add New Language"}
            onClick={navigateToCreateScreen}
          />
        </div>
        <div className="learningLanguageCardItems">
          {arr.map(() => {
            return (
              <div className="pointer">
                 <LearningLanguageItemCard title={"English"} count={35} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="learningLanguageScreenPaginationDiv">
        <CustomPagination />
      </div>
    </div>
  );
};
