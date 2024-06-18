import React from "react";
import { useTranslation } from "react-i18next";
import "./table-subscribe-button-style.css";
import { Colors } from "../../../../assets/colors/colors";

export const TableSubscribeButton = () => {
  const { t } = useTranslation();

  return (
    <button
      className="tableSubscribeButton"
      style={{ backgroundColor: Colors.PURPLE, color: Colors.WHITE }}
    >
      {t("SUBSCRIBE")}
    </button>
  );
};
