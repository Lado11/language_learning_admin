import React, { useEffect } from "react";
import "./learning-language-screen-style.css";
import "../../global-styles/global-styles.css";
import { Colors } from "../../assets/colors/colors";
import { CustomAddNew, CustomPagination, CustomSpin } from "../../components";
import { LearningLanguageItemCard } from "./components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  learningLanguagesThunk,
  learningLanguages,
  getLearnLanguagesLoading,
  learnLanguageByIdThunk,
} from "../../store/slices";
import {} from "../../components/custom-spin/custom-spin";

export const LearningLanguageScreen = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const learningLanguagesData = useSelector(learningLanguages);
  const learnLanguagesLoading = useSelector(getLearnLanguagesLoading);
  const pageLength = 12;

  const navigateToCreateScreen = () => {
    navigate("/learning-language-create");
  };
  const learningUpdate = (id) => {
    dispatch(learnLanguageByIdThunk(id));
    localStorage.setItem("learningId", id);
    navigate("/learning-update");
  };
  const data = {
    skip: 0,
    limit: 12,
  };
  useEffect(() => {
    dispatch(learningLanguagesThunk(data));
  }, []);

  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div className="learningLanguageScreenSubDiv">
        <div className="learningLanguageScreenAddNewDiv">
          <CustomAddNew
            title={"Add New Language"}
            onClick={navigateToCreateScreen}
          />
        </div>
        <p className="nativeLanguageTitle">Learning Language</p>
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
        <CustomPagination length={learningLanguagesData?.data?.total} pageLength={pageLength}/>
      </div>
    </div>
  );
};
