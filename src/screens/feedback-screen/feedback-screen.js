import React from "react";
import { Colors } from "../../assets/colors/colors";
import { useTranslation } from "react-i18next";
import "./feedback-screen-style.css";
import { FeedbackScreenCardItem } from "./components/feedback-screen-card-item";

export const FeedbackScreen = () => {
  const { t } = useTranslation();

  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <p className="feedbackTitle">{t("FEEDBACK")}</p>
        <FeedbackScreenCardItem />
      </div>
    </div>
  );
};
