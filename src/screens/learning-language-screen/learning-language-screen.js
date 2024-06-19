import React, { useEffect } from "react";
import "./learning-language-screen-style.css";
import "../../global-styles/global-styles.css";
import { Colors } from "../../assets/colors/colors";
import { CustomAddNew, CustomNoData, CustomPagination, CustomSpin } from "../../components";
import { LearningLanguageItemCard } from "./components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  learningLanguagesThunk,
  learningLanguages,
  getLearnLanguagesLoading,
  learnLanguageByIdThunk,
} from "../../store/slices";

export const LearningLanguageScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const learningLanguagesData = useSelector(learningLanguages);
  // const learningLanguagesData = []
  const learnLanguagesLoading = useSelector(getLearnLanguagesLoading);
  const pageLength = 12;

  const navigateToCreateScreen = () => {
    navigate("/learning-language-create");
  };
  const learningUpdate = (id) => {
    dispatch(learnLanguageByIdThunk(id));
    localStorage.setItem("learningId", id);
    navigate(`/learning-language/${id}`);
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
      <>
        <div className="learningLanguageScreenSubDiv">
          <div className="learningLanguageScreenAddNewDiv">
            <CustomAddNew
              title={"Add New Language"}
              onClick={navigateToCreateScreen}
            />
          </div>
          <p className="nativeLanguageTitle">Learning Language</p>
          {!learningLanguagesData?.data?.list?.length && !learnLanguagesLoading ?
            <CustomNoData /> :
            <>
              {learnLanguagesLoading ? <div className="learningLanguageScreenLoadingDiv loadingDiv">
                <CustomSpin size={64} color="gray" />
              </div> :
                <div className="learningLanguageCardItems">
                  {learningLanguagesData?.data?.list.map((lang, index) => {
                    return (
                      <div className="pointer" key={index}>
                        <LearningLanguageItemCard
                          data={lang?.nativeLanguages}
                          title={lang.name}
                          count={learningLanguagesData?.data?.total}
                          onTap={() => {
                            learningUpdate(lang?._id);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              }
              <div className="learningLanguageScreenPaginationDiv">
                <CustomPagination length={learningLanguagesData?.data?.total} pageLength={pageLength} />
              </div>
            </>
          }
        </div>
      </>
    </div>
  );
};
