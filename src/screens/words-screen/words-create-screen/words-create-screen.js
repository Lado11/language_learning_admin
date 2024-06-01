import React, { useState } from "react";
import { Colors } from "../../../assets/colors";
import { CreateWordsAdd } from "./components";
import { Form } from "antd";
import { CustomAntdButton, CustomButton } from "../../../components";

export const WordsCreateScreen = () => {
  const [createWordSelectedLang, setCreateWordSelectedLang] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const onFinish = (values) => {
    console.log(values.word, "values.word");
    console.log(values.transcribe, "values.transcribe");
    console.log(createWordSelectedLang, "createWordSelectedLang");
    console.log(selectedLevel, "selectedLevel");
    console.log(selectedCategory, "selectedCategory");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="screensMainDiv wordsCreateScreen"
      style={{ backgroundColor: Colors.WHITE }}
    >
      <div className="wordsCreateAddWords">
        <Form
          className="wordsCreateForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CreateWordsAdd
            setCreateWordSelectedLang={setCreateWordSelectedLang}
            setSelectedLevel={setSelectedLevel}
            setSelectedCategory={setSelectedCategory}
          />
          <CustomAntdButton title="Add" background={Colors.PURPLE} />
        </Form>
      </div>
      <div className="wordsCreateTranslate"></div>
    </div>
  );
};
