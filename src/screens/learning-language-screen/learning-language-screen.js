import React, { useEffect } from "react";
import "./learning-language-screen-style.css";
import { Colors } from "../../assets/colors/colors";
import { CustomAddNew, CustomPagination } from "../../components";
import { LearningLanguageItemCard } from "./components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  learningLanguagesThunk,
  learningLanguages,
} from "../../store/slices/lern-language/learn-languages-slice";

export const LearningLanguageScreen = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const learningLanguagesData = useSelector(learningLanguages);

  const navigateToCreateScreen = () => {
    navigate("/learning-language-create");
  };

  useEffect(() => {
    dispatch(learningLanguagesThunk());
  }, []);

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
          {learningLanguagesData?.data?.list.map((lang) => {
            return (
              <div className="pointer">
                <LearningLanguageItemCard
                  title={lang.name}
                  count={learningLanguagesData?.data?.total}
                  onTap={() => {
                    navigate("/learning-update");
                  }}
                />
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
