import React, { useEffect, useState } from "react";
import { Colors } from "../../../assets/colors";
import { CreateWordsAdd } from "./components";
import { Form, Input, message } from "antd";
import { CustomAntdButton, CustomAntdInput, Error, Success } from "../../../components";
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
  const [selectedImage, setSelectedImage] = useState();
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const [categoryShow, setCategoryShow] = useState();
  const [val, setVal] = useState()
  const messageError = createWordData?.message;
  const [inputs, setInputs] = useState(['']);

  const addInputField = () => {
    setInputs([...inputs, '']); 
  };
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value; 
    setInputs(newInputs);
  };

  const handleDeleteInput = (index) => {
    // Remove the input at the specified index
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
};
  const onFinish = (values) => {
    formData.append("word", values?.word)
    formData.append("transcription", values?.transcription)
    formData.append("level", selectedLevel)
    formData.append("language", learningLanguageWordSelectedValue?.value)
    formData.append("category", selectedCategory)
    selectedImage && formData.append("image", selectedImage);
    formData.append("audio", fileListVoice)
    Object.keys(values).map((date, index) => {
      if (date.includes("nativeInpust")) {
        array.push(values[date])
      }
    })
    inputs.forEach((inputValue, index) => {
      inputValue !== "" && formData.append(`sentences[${index}]`, inputValue);
    });
    array?.map((values, ind) => {
      formData.append(`translates[${ind}].text[${0}]`, values);
    })
    learningLanguageWordSelectedValue?.nativeLanguages.forEach((item, ind) => {
      formData.append(`translates[${ind}].nativeLanguage`, item?._id);
    });
    setVal(values)
    dispatch(createWordsThunk(formData))
  };

  useEffect(() => {
    if (createWordData?.success === true) {
      setAudio()
      setIamge()
      setSelectedCategory("")
      setPreviewimgUrl("")
      setSelectedLevel("")
      setCategoryShow(null);
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
      className="nativeLanguageCreateScreenMainDiv wordsCreateScreen"
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
                previewImgUrl={previewImgUrl}
                setPreviewimgUrl={setPreviewimgUrl}
                categoryShow={categoryShow}
                setCategoryShow={setCategoryShow}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
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
              {learningLanguageWordSelectedValue && <p className="titleTranslations">Translate</p>}
              {learningLanguageWordSelectedValue?.nativeLanguages?.length ? learningLanguageWordSelectedValue?.nativeLanguages.map((item, index) => {
                return (
                  <div>
                    <p className="itemName">{item?.nameEng}</p>
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
              <div>
                <div className="addSentences">
                  <p className="itemName">Sentences</p>
                  <p className="itemName" onClick={addInputField}>
                    Add +
                  </p>
                </div>
                {inputs.map((inputValue, index) => (
                  <Form.Item
                    name={index}
                  >
                  <div className="delteInput">
                  
                  <Input key={index}
                      placeholder="Sentences"
                      value={inputValue}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                       />
                      <p  className="itemName deleteItem" onClick={()=>{
                        handleDeleteInput(index)
                      }}>
                        -
                       </p>
                  </div>
                  </Form.Item>

                ))}
              </div>
            </div>
          </div>
          <div className="addButtonDiv">
            {contextHolder}
            <CustomAntdButton onClick={() => {
            }} title="Add" loading={loadingCreateWord} background={Colors.PURPLE} />
          </div>
        </Form>
      </div>
    </div>
  );
};
