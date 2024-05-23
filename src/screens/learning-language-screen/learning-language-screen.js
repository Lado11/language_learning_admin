import React, { useEffect } from "react";
import "./learning-language-screen-style.css";
import "../../global-styles/global-styles.css";
import { Colors } from "../../assets/colors/colors";
import { CustomAddNew, CustomPagination } from "../../components";
import { LearningLanguageItemCard } from "./components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  learningLanguagesThunk,
  learningLanguages,
  getLearnLanguagesLoading,
} from "../../store/slices/learn-language/learn-languages-slice";
import { CustomSpin } from "../../components/custom-spin/custom-spin";
import {
  changeLearnLanguageCreateSuccess,
  learnLanguageByIdThunk,
  removeAllLanguages,
} from "../../store/slices";

export const LearningLanguageScreen = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const learningLanguagesData = useSelector(learningLanguages);
  const learnLanguagesLoading = useSelector(getLearnLanguagesLoading);

  const navigateToCreateScreen = () => {
    navigate("/learning-language-create");
  };
  const learningUpdate = (id) => {
    dispatch(learnLanguageByIdThunk(id));
    localStorage.setItem("learningId", id);
    navigate("/learning-update");
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
        {learnLanguagesLoading ? (
          <div className="learningLanguageScreenLoadingDiv loadingDiv">
            {" "}
            <CustomSpin size={64} color="gray" />{" "}
          </div>
        ) : (
          <div className="learningLanguageCardItems">
            {learningLanguagesData?.data?.list.map((lang) => {
              return (
                <div className="pointer" key={lang?.id}>
                  <LearningLanguageItemCard
                    title={lang.name}
                    count={learningLanguagesData?.data?.total}
                    onTap={() => {
                      learningUpdate(lang?.id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="learningLanguageScreenPaginationDiv">
        <CustomPagination />
      </div>
    </div>
  );
};
