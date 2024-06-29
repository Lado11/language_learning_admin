import React, { useEffect, useState } from "react";
import "./learning-language-screen-style.css";
import "../../global-styles/global-styles.css";
import { Colors } from "../../assets/colors/colors";
import { CustomAddNew, ImageItem, CustomNoData, CustomPagination, CustomSpin } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  learningLanguagesThunk,
  learningLanguages,
  getLearnLanguagesLoading,
  learnLanguageByIdThunk,
} from "../../store/slices";
import { ConstPagiantion } from "../../constants/const-pagination";
import { listItemCountForShow } from "../../constants/constants";
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from "../../store/slices/files/get-id-files";

export const LearningLanguageScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const learningLanguagesData = useSelector(learningLanguages);
  const learnLanguagesLoading = useSelector(getLearnLanguagesLoading);
  const imageLoading  = useSelector(getfilesGetIdloading);

  const navigateToCreateScreen = () => {
    navigate("/learning-language/create");
  };

  const learningUpdate = (id) => {
    dispatch(learnLanguageByIdThunk(id));
    navigate(`/learning-language/${id}`);
  };
 
  useEffect(() => {
    !learningLanguagesData?.data?.list?.length && dispatch(learningLanguagesThunk(ConstPagiantion(0,listItemCountForShow)));
  }, []);


  const [imageUrls, setImageUrls] = useState({});
  const learningImageResponse = useSelector(getfilesGetIdResponse);

  useEffect(() => {
    // Preload image URLs
    if (learningLanguagesData?.data?.list?.length) {
      learningLanguagesData?.data?.list?.forEach((item) => {
        fetchImage(item.imageFile);
      });
    }
  }, [learningLanguagesData?.data?.list]);

  const fetchImage = (imageFileId) => {
    if (!imageUrls[imageFileId]) {
      dispatch(filesGetIdThunk(imageFileId));
    }
  };


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
                    console.log(lang,"lang");
                    return (
                         <div
                          key={lang?._id}
                          onClick={() => {
                            learningUpdate(lang?._id);
                          }}
                          className="pointer"
                        >
                          <ImageItem
                            count={lang?.nativeLanguages?.length}
                            loading={imageLoading}
                            icon={imageUrls[lang.imageFile]}
                            title={lang.name}
                          />
                        </div>
                    );
                  })}
                </div>
              }
              <div className="learningLanguageScreenPaginationDiv">
                <CustomPagination length={learningLanguagesData?.data?.total} pageLength={listItemCountForShow} />
              </div>
            </>
          }
        </div>
      </>
    </div>
  );
};

