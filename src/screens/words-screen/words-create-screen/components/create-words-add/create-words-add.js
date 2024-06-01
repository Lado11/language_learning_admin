import React from "react";
import "./create-words-add-style.css";
import {
  CustomAntdInput,
  CustomAntdSelect,
  CustomUpload,
} from "../../../../../components";
import { Colors } from "../../../../../assets/colors";
import { VoiceUpload } from "./components/voic-upload";

export const CreateWordsAdd = ({
  setCreateWordSelectedLang,
  setSelectedLevel,
  setSelectedCategory,
}) => {
  const data = [
    {
      value: "1",
      label: "admin",
    },
    {
      value: "2",
      label: "client",
    },
    {
      value: "3",
      label: "operator",
    },
  ];

  return (
    <div className="createWordsAdd">
      <p className="addWords">Add Words</p>
      <div className="addWordsFirstSelect">
        <CustomAntdSelect
          optinData={data}
          defaultValue="English"
          setSelected={setCreateWordSelectedLang}
          color={Colors.BACKGROUND_COLOR}
        />
      </div>
      <div className="createWordsAddInputs">
        <CustomAntdInput
          placeholder="Words*"
          name={"word"}
          type={"text"}
          min={4}
        />
        <CustomAntdInput
          placeholder="Transcribe*"
          name={"transcribe"}
          type={"text"}
          min={4}
          message={"This field is required"}
        />
        <CustomAntdSelect
          // width={172}
          defaultValue="Level*"
          optinData={data}
          setSelected={setSelectedLevel}
        />
        <CustomAntdSelect
          // width={172}
          defaultValue="Category*"
          optinData={data}
          setSelected={setSelectedCategory}
        />
      </div>
      <div>
        <VoiceUpload />
      </div>
      <div>
        <CustomUpload />
      </div>
    </div>
  );
};
