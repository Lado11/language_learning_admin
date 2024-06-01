import React from "react";
import "./learning-language-item-card-style.css";
import { Colors } from "../../../assets/colors/colors";
import AvatarGroup from "react-avatar-group";
import { sliceText } from "../../utils/helper";

export const LearningLanguageItemCard = ({ title, count, onTap }) => {
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
        <AvatarGroup
          avatars={[
            "James",
            "Amy",
            "Will",
            "Amy",
            "Will",
            "Will" /* or IAvatar objects */,
          ]}
          initialCharacters={1}
          max={3}
          size={30}
          //   displayAllOnHover
          shadow={2}
        />
      </div>
    </div>
  );
};
