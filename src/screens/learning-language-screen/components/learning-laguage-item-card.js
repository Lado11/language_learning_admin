import React, { useEffect, useState } from "react";
import "./learning-language-item-card-style.css";
import { Colors } from "../../../assets/colors/colors";
import { Avatar } from 'antd';
import { sliceText } from "../../utils/helper";
import { filesGetIdThunk, getfilesGetIdResponse } from "../../../store/slices/files/get-id-files";
import { useDispatch, useSelector } from "react-redux";

export const LearningLanguageItemCard = ({ data, title, count, onTap }) => {
  const dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState({});
  const categoryImageResponse = useSelector(getfilesGetIdResponse);

  useEffect(() => {
    // Preload image URLs
    if (data?.length) {
      data.forEach((item) => {
        fetchImage(item.imageFile);
      });
    }
  }, [data]);

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
  
  return (
    <div
      className="learningLanguageCard"
      style={{ backgroundColor: Colors.BACKGROUND_COLOR }}
      onClick={onTap}
    >
      <div className="learningLanguageCardFirstLine">
        <p className="learningLanguageCardTitle">{sliceText(title)}</p>
        <div className="learningLanguageCardUsersCount">
          <p className="learningLanguageCardUsersCountText">{count} Users</p>
        </div>
      </div>
      <div className="learningLanguageItemAvatarGroup">
        <Avatar.Group
          maxCount={4}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
        >
          {data?.map((item, index) => {
            return <div key={index}>
              <Avatar src={imageUrls[item.imageFile]} />
            </div>
          })}
        </Avatar.Group>
      </div>
    </div>
  );
};
