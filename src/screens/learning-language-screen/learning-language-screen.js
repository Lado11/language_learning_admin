import React, { useEffect, useState } from "react";
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
import { ConstPagiantion } from "../../constants/const-pagination";
import { page0, page12 } from "../../constants/constants";
import { filesGetIdThunk, getfilesGetIdResponse } from "../../store/slices/files/get-id-files";

export const LearningLanguageScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const learningLanguagesData = useSelector(learningLanguages);
  const learnLanguagesLoading = useSelector(getLearnLanguagesLoading);
  const navigateToCreateScreen = () => {
    navigate("/learning-language-create");
  };
  const learningUpdate = (id) => {
    dispatch(learnLanguageByIdThunk(id));
    navigate(`/learning-language/${id}`);
  };
 
  useEffect(() => {
    dispatch(learningLanguagesThunk(ConstPagiantion(page0,page12)));
  }, []);


  const [imageUrls, setImageUrls] = useState({});
  const learningImageResponse = useSelector(getfilesGetIdResponse);

  useEffect(() => {
    // Preload image URLs
    if (learningLanguagesData?.data?.list?.length > 0) {
      learningLanguagesData?.data?.list?.forEach((item) => {
       item?.nativeLanguages?.forEach((lang) => {
        fetchImage(lang.imageFile);
       });
      });
    }
  }, [learningLanguagesData?.data?.list]);

  const fetchImage = (imageFileId) => {
    if (!imageUrls[imageFileId]) {
      dispatch(filesGetIdThunk(imageFileId));
    }
  };

  const getImage = (url) => {
    url?.forEach((image)=> imageUrls[image?.imageFile])
  }

  useEffect(() => {
    // Update imageUrls state with fetched image URLs
    if (learningImageResponse?.data?.url) {
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [learningImageResponse.data.fileId]: learningImageResponse.data.url,
      }));
    }
  }, [learningImageResponse]);
  
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
                          icon={getImage(lang?.nativeLanguages)}
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
                <CustomPagination length={learningLanguagesData?.data?.total} pageLength={page12} />
              </div>
            </>
          }
        </div>
      </>
    </div>
  );
};
