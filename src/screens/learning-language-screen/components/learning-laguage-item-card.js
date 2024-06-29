import React from "react";
import "./learning-language-item-card-style.css";
import { Colors } from "../../../assets/colors/colors";
import { Avatar } from 'antd';
import { sliceText } from "../../utils/helper";

export const LearningLanguageItemCard = ({ imageUrls,data,icon, title, count, onTap }) => {
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
