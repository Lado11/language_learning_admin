import React from "react";
import { Colors } from "../../assets/colors/colors";
import "../../global-styles/index";
import { CustomAddNew, CustomSelect, MyCustomTable } from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const UserScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className="nativeLanguageScreenMainDiv"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div>
        <CustomAddNew
          title={"Add New User"}
          onClick={() => {
            navigate("/user-create");
          }}
        />
        <p className="screensTitleStyle">{t("USER")}</p>
        <div className="select-row">
          <CustomSelect title={t("SUBSCRIPTION")} />
          <CustomSelect title={t("VERIFED_BY_PHONE")} />
          <CustomSelect title={t("VERIFED_BY_EMAIL")} />
        </div>

        {/* <MyCustomTable /> */}
      </div>
    </div>
  );
};
