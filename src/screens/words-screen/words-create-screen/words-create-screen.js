import React, { useEffect, useState } from "react";
import { Colors } from "../../../assets/colors";
import { CreateWordsAdd } from "./components";
import { Form, message } from "antd";
import { CustomAntdButton, CustomAntdInput, CustomButton, Error, Success } from "../../../components";
import "./words-create.css"
import { useDispatch, useSelector } from "react-redux";
import { createWordsLoadingData, createWordsResponseData, createWordsThunk, deleteWordCreateResponse } from "../../../store/slices";

export const WordsCreateScreen = () => {
  const [form] = Form.useForm();
  const [createWordSelectedLang, setCreateWordSelectedLang] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const [audio, setAudio] = useState();
  const [image, setIamge] = useState()
  const [fileList, setFileList] = useState();
  const [fileListVoice, setFileListVoice] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [learningLanguageWordSelectedValue, setLearningLanguageWordSelectedValue] = useState();
  const dispatch = useDispatch();
  const createWordData = useSelector(createWordsResponseData);
  const formData = new FormData();
  const array = [];
  const loadingCreateWord = useSelector(createWordsLoadingData);

const [val,setVal] = useState()
console.log(val,"val");
  const onFinish = (values) => {
    formData.append("word", values?.word)
    formData.append("transcription", values?.transcription)
    formData.append("level", selectedLevel?.value)
    formData.append("language", learningLanguageWordSelectedValue?._id)
    formData.append("category", selectedCategory?._id)
    formData.append("image", fileList)
    formData.append("audio", fileListVoice)

    Object.keys(values).map((date, index) => {
      if (date.includes("nativeInpust")) {
        array.push(values[date])
      }
    })
    array?.map((values, ind) => {
      formData.append(`translates[${ind}].text[${0}]`, values);
    })
    learningLanguageWordSelectedValue?.nativeLanguages.forEach((item, ind) => {
      formData.append(`translates[${ind}].nativeLanguage`, item?._id);
    });
    setVal(values)
  };
  const messageError = createWordData?.message;

  useEffect(() => {
    if (createWordData?.success === true) {
      setAudio()
      setIamge()
      setLearningLanguageWordSelectedValue()
      form.resetFields()
      dispatch(deleteWordCreateResponse());
    }
  }, [createWordData?.success])

  useEffect(() => {
    createWordData?.success === true && Success({ messageApi });
    createWordData?.success === false &&
      Error({ messageApi, messageError });
    dispatch(deleteWordCreateResponse());
  }, [createWordData?.success]);


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
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="addWordsDiv">
            <div className="addWordsFirstSelect">
              <CreateWordsAdd
                image={image}
                setIamge={setIamge}
                setAudio={setAudio}
                audio={audio}
                setFileListVoice={setFileListVoice}
                fileListVoice={fileListVoice}
                setFileList={setFileList}
                fileList={fileList}
                learningLanguageWordSelectedValue={learningLanguageWordSelectedValue}
                setLearningLanguageWordSelectedValue={setLearningLanguageWordSelectedValue}
                setCreateWordSelectedLang={setCreateWordSelectedLang}
                setSelectedLevel={setSelectedLevel}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            <div className="translateSection">
              {learningLanguageWordSelectedValue && <p>Translate</p>}
              {learningLanguageWordSelectedValue?.nativeLanguages?.length ? learningLanguageWordSelectedValue?.nativeLanguages.map((item, index) => {
                return (
                  <div>
                    <p>{item?.nameEng}</p>
                    <CustomAntdInput
                      key={item}
                      rules={false}
                      className="inputTranslate"
                      placeholder="Words*"
                      name={`nativeInpust${index}`}
                      type={"text"}
                      min={4}
                    />
                  </div>
                )
              }) : null
              }
            </div>
          </div>
          <div className="addButtonDiv">
            {contextHolder}
            <CustomAntdButton onClick={() => {
            dispatch(createWordsThunk(formData)) 
            }} title="Add" loading={loadingCreateWord} background={Colors.PURPLE} />
          </div>
        </Form>
      </div>
    </div>
  );
};
