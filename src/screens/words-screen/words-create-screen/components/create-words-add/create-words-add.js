import React, { useEffect, useState } from "react";
import "./create-words-add-style.css";
import {
  CustomAntdInput,
  CustomAntdSelect,
  CustomUpload,
} from "../../../../../components";
import { Colors } from "../../../../../assets/colors";
import { useTranslation } from "react-i18next";
import { categoryGetThunk, getCategoryGetData, learningLanguages, learningLanguagesThunk } from "../../../../../store/slices";
import { useDispatch, useSelector } from "react-redux";
import { wordlevel } from "../../../../../data";
import { Waveform } from "./music-player";
import logo from "../../../../../assets/images/Vector (4).png"
import { Form } from "antd";
import remove_icon from "../../../../../assets/images//remove_icon.png"

export const CreateWordsAdd = ({
  image,
  setIamge,
  setAudio,
  audio,
  setFileListVoice,
  setSelectedLevel,
  setFileList,
  fileList,
  setSelectedCategory,
  learningLanguageWordSelectedValue,
  setLearningLanguageWordSelectedValue
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const learningLanguagesData = useSelector(learningLanguages);
  const categoryData = useSelector(getCategoryGetData)?.data?.list;
  const [showVoice, setShowVoice] = useState(false);
  const filteredResponseCategory = categoryData?.map((lang) => {
    return {
      _id: lang._id,
      label: lang.name.toLowerCase(),
      value: lang.name,
    };
  });

  const filteredResponse = learningLanguagesData?.data?.list?.map((lang) => {
    return {
      _id: lang._id,
      label: lang.name.toLowerCase(),
      value: lang.name,
      nativeLanguages: lang?.nativeLanguages
    };
  });

  const skipNative = {
    skip: 0,
    limit: 12,
  };
  const addFile = (e) => {
    const s = URL?.createObjectURL(e.target.files?.[0])
    setFileListVoice(e.target.files?.[0])
    setAudio(s)
  }

  useEffect(() => {
    dispatch(learningLanguagesThunk(skipNative));
    dispatch(categoryGetThunk(skipNative));
  }, []);

  return (
    <div className="createWordsAdd">
      <p className="nativeLanguageTitle">Add Words</p>
      <div className="addWordsFirstSelect bigSelect">
        <CustomAntdSelect
          rules={true}
          name={"Learning language"}
          // className="wordsSelectExel"
          optinData={filteredResponse}
          selected={learningLanguageWordSelectedValue}
          setSelected={setLearningLanguageWordSelectedValue}
          defaultValue={t("LEARNING_LANGUAGE")}
          color={Colors.LIGHT_GRAY}
        />
      </div>
      <div className="createWordsAddInputs createWordsRow">
        <div className="rowInputWords">
          <CustomAntdInput
            placeholder="Words*"
            name={"word"}
            type={"text"}
            min={4}
            rules={true}
          />
          <div className="inputLeft">
            <CustomAntdInput
              placeholder="Transcribe*"
              name={"transcription"}
              type={"text"}
              min={1}
              message={"This field is required"}
              rules={true}

            />
          </div>
        </div>
        <div className="rowInputWords">
          <CustomAntdSelect
            name={"Level"}
            rules={true}
            // width={172}
            defaultValue="Level*"
            optinData={wordlevel}
            setSelected={setSelectedLevel}
          />
          <CustomAntdSelect
            rules={true}
            name={"Category"}
            // width={172}
            defaultValue="Category*"
            optinData={filteredResponseCategory}
            setSelected={setSelectedCategory}
          />
        </div>
      </div>

      <>
        {audio ? <div className="imgae_upload_design_voice">
          <div className="remove_icon_div">
            <img
              src={remove_icon}
              onClick={() => {
                setAudio(null)
              }}
            />
          </div>
          <Waveform url={audio} />


        </div> : <Form.Item
          name={"Words voice"}
          rules={[{ required: true }]}
        > <div className="file-upload">
            <div className="voiceUpload">
              <p className="titleVoiceUpload">
                Voice Upload
              </p>
              <img src={logo} />
            </div>
            <input accept="audio/*" type='file' onChange={addFile} />
          </div> </Form.Item>}
      </>
      {/* } */}

      {/* {audio ? <Waveform url={audio} /> : null}
      <Form.Item
        name={"Words voice"}
        rules={[{ required: true }]}
      >
      <div className="file-upload">
        <div className="voiceUpload">
          <p className="titleVoiceUpload">
            Voice Upload
          </p>
          <img src={logo} />
        </div>
        <input accept="audio/*" type='file' onChange={addFile} />
      </div>
      </Form.Item> */}

      <CustomUpload setIamge={setIamge} image={image} setFileList={setFileList} fileList={fileList} />
    </div>
  );
};
