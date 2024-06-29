import React, { useEffect, useState } from "react";
import { CustomAddNew } from "../../components/custom-add-new/custom-add-new";
import { CustomCountryItem } from "../../components/custom-country-item/custom-country-item";
import "./native-language-style.css";
import "../../global-styles/global-styles.css";
import { CustomNoData, CustomPagination } from "../../components";
import { useNavigate } from "react-router-dom";
import {
  getNativeGetResponse,
  getNativeGetloading,
  nativeLanguageGetThunk,
} from "../../store/slices/native-language/native-language-get";
import { useDispatch, useSelector } from "react-redux";
import { nativeLanguageGetIdThunk } from "../../store/slices/native-language/get-id-native-language";
import { CustomSpin } from "../../components/custom-spin/custom-spin";
import { ConstPagiantion } from "../../constants/const-pagination";
import { page0, page12 } from "../../constants/constants";
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from "../../store/slices/files/get-id-files";

export const NativeLanguageScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nativeLoading = useSelector(getNativeGetloading);
  const nativeLanguageData = useSelector(getNativeGetResponse);
  const nativeData = nativeLanguageData?.data?.list;
  const imageLoading = useSelector(getfilesGetIdloading);
  const [imageUrls, setImageUrls] = useState({});
  const categoryImageResponse = useSelector(getfilesGetIdResponse);

  useEffect(() => {
    // Preload image URLs
    if (nativeLanguageData?.data?.list?.length) {
      nativeLanguageData.data.list.forEach((item) => {
        fetchImage(item.imageFile);
      });
    }
  }, [nativeLanguageData]);

  const fetchImage = (imageFileId) => {
    if (!imageUrls[imageFileId]) {
      dispatch(filesGetIdThunk(imageFileId));
    }
  };

  useEffect(() => {
    // Update imageUrls state with fetched image URLs
    if (categoryImageResponse?.data?.url) {
      setImageUrls((prevUrls) => ({
        ...prevUrls,
        [categoryImageResponse.data.fileId]: categoryImageResponse.data.url,
      }));
    }
  }, [categoryImageResponse]);

  const navigateNativeUpdate = (countryItem) => {
    // localStorage.setItem("nativeId", countryItem?._id);
    dispatch(nativeLanguageGetIdThunk(countryItem?._id));
    navigate(`/native-language/${countryItem?._id}`);
  };

  useEffect(() => {
    dispatch(nativeLanguageGetThunk(ConstPagiantion(page0, page12)));
  }, []);

  return (
    <>
      <div className="nativeLanguageScreenMainDiv">
        <div>
          <CustomAddNew
            title={"Add New Language"}
            onClick={() => {
              navigate("/native-language-create");
            }}
          />
          <p className="category-title">Native Language</p>
          <div>
            {!nativeData?.length && !nativeLoading ? <CustomNoData /> :

              <>
                {nativeLoading ?
                  <div className="loadingDiv nativeLanguageScreenMainDiv">
                    <CustomSpin size={64} color="gray" />
                  </div>
                  :
                  <div className="nativeLanguageCountryItems">
                    {nativeData?.map((countryItem) => {
                      return (
                        <div
                          key={countryItem?._id}
                          onClick={() => {
                            navigateNativeUpdate(countryItem);
                          }}
                          className="pointer"
                        >
                          <CustomCountryItem
                            loading={imageLoading}
                            icon={imageUrls[countryItem.imageFile]}
                            title={countryItem.nameEng}
                          />
                        </div>
                      );
                    })}
                  </div>
                }
                <div className="nativeScreenPaginationDiv">
                  <CustomPagination length={nativeLanguageData?.data?.total} pageLength={page12} func={() => {
                    nativeLanguageGetThunk()
                  }} />
                </div>
              </>}
          </div>
        </div>
      </div>
    </>
  );
};
