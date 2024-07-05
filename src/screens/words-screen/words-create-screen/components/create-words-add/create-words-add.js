import React, { useState } from "react";
import "./create-words-add-style.css";
import {
  CustomAntdInput,
  CustomAntdSelect,
  CustomAsyncPaginate,
  CustomUpload,
} from "../../../../../components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { wordlevel } from "../../../../../data";
import { Waveform } from "./music-player";
import logo from "../../../../../assets/images/Vector (4).png"
import { Form } from "antd";
import remove_icon from "../../../../../assets/images//remove_icon.png"
import { customStyles, customStylesCategory } from "../../../../../global-styles/loadOptionsStyles";
import { loadOptions } from "../../../../../helper/loadOptions";
import { categoryUrl, learningLanguageUrl } from "../../../../learning-language-screen/learning-langauge-constant";
import { AsyncPaginate } from "react-select-async-paginate";

export const CreateWordsAdd = ({
  setCategoryShow,
  categoryShow,
  setPreviewimgUrl,
  previewImgUrl,
  image,
  setSelectedImage,
  selectedImage,
  setIamge,
  setAudio,
  audio,
  setFileListVoice,
  setSelectedLevel,
  setFileList,
  fileList,
  setSelectedCategory,
  setLearningLanguageWordSelectedValue
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0)


  const handleLoadOptions = async (inputValue, loadedOptions, { page }) => {
    const { options, hasMore } = await loadOptions(inputValue, loadedOptions, { page }, learningLanguageUrl);
    return {
      options: options,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  const handleLoadOptionsCategory = async (inputValue, loadedOptions, { page }) => {
    const { options, hasMore } = await loadOptions(inputValue, loadedOptions, { page }, categoryUrl);
    return {
      options: options,
      hasMore: hasMore,

      additional: {
        page: page + 1,
      },
    };
  };

  const handleLoadOptionsLevel = async (inputValue, loadedOptions) => {
    const { wordlevel } = await loadOptions(inputValue, loadedOptions,);
    return {
      options: wordlevel,
    };
  };


  const onChange = (value) => {
    setLearningLanguageWordSelectedValue(value)
  }

  const onChangeCategory = (value) => {
    setSelectedCategory(value?.value)
  }

  const onChangeLevel = (value) => {
    setSelectedLevel(value?.value)
  }



  const addFile = (e) => {
    const s = window.URL?.createObjectURL(e.target.files?.[0])
    setFileListVoice(e.target.files?.[0])
    setAudio(s)
  }

  // useEffect(() => {
  //   dispatch(learningLanguagesThunk(skipNative));
  //   dispatch(categoryGetThunk(skipNative));
  // }, []);

  return (
    <div className="createWordsAdd">
      <p className="nativeLanguageTitle">Add Words</p>
      <div className="addWordsFirstSelect bigSelect">
        <CustomAsyncPaginate style={customStyles} onChange={onChange} current={current} placeholder="English"
          loadOptions={handleLoadOptions} />
        {/* <CustomAntdSelect
          rules={true}
          name={"Learning language"}
          // className="wordsSelectExel"
          optinData={filteredResponse}
          selected={learningLanguageWordSelectedValue}
          setSelected={setLearningLanguageWordSelectedValue}
          defaultValue={t("LEARNING_LANGUAGE")}
          color={Colors.LIGHT_GRAY}
        /> */}
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
        <div className="rowInputWords asyncselect">
          <AsyncPaginate
            styles={customStylesCategory}
            placeholder={"Level"}
            onChange={onChangeLevel}
            loadOptions={handleLoadOptionsLevel}
            additional={{
              page: current, // Initial page
            }}
            // Assuming `localData` is an array of local options
            options={wordlevel}
          />
         
          {/* <CustomAntdSelect
            name={"Level"}
            rules={true}
            // width={172}
            defaultValue="Level*"
            optinData={wordlevel}
            setSelected={setSelectedLevel}
          /> */}
          <div className="categoryLeft">
          <CustomAsyncPaginate style={customStylesCategory}
            onChange={onChangeCategory} current={current} placeholder="Category*" loadOptions={handleLoadOptionsCategory} />

          </div>
          {/* <CustomAntdSelect
            rules={true}
            name={"Category"}
            // width={172}
            defaultValue="Category*"
            optinData={filteredResponseCategory}
            setSelected={setSelectedCategory}
          /> */}
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
      <CustomUpload previewImgUrl={previewImgUrl}
        setPreviewimgUrl={setPreviewimgUrl}
        categoryShow={categoryShow}
        setCategoryShow={setCategoryShow} selectedImage={selectedImage} setSelectedImage={setSelectedImage} setIamge={setIamge} image={image} setFileList={setFileList} fileList={fileList} />
    </div>
  );
};
