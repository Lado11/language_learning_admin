import React, { useEffect, useState } from "react";
import "./create-words-add-style.css";
import {
  CustomAntdInput,
  CustomAntdSelect,
  CustomAsyncPaginate,
  CustomUpload,
} from "../../../../../components";
import { useTranslation } from "react-i18next";
import { categoryGetThunk, getCategoryGetData,  learningLanguagesThunk } from "../../../../../store/slices";
import { useDispatch, useSelector } from "react-redux";
import { wordlevel } from "../../../../../data";
import { Waveform } from "./music-player";
import logo from "../../../../../assets/images/Vector (4).png"
import { Form } from "antd";
import remove_icon from "../../../../../assets/images//remove_icon.png"
import axios from "axios";

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
  const categoryData = useSelector(getCategoryGetData)?.data?.list;
  const token = localStorage.getItem("token")
  const LIMIT = 10;
  const [current, setCurrent] = useState(0)
  const URL = process.env.REACT_APP_BASE_URL;

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#fff" : "#fff", // Background color for selected options
      color: state.isSelected ? "#fff" : "#fff", // Text color for selected options
      padding: "8px 12px", // Padding for options
      fontSize: "14px", // Font size for options
      height: "60px", // Height of each option
      borderRadius:"10px",
      border:"none",
    }),
    control: (provided) => ({
      ...provided,
      border:"none", // Border color
      minHeight: "60px", // Minimum height of the control
      boxShadow: "none", // Remove box shadow
      borderRadius:"10px",
      backgroundColor:"#F7F8FA"

    }),
  };

  const customStylesCategory = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#fff" : "#fff", // Background color for selected options
      color: state.isSelected ? "#fff" : "#fff", // Text color for selected options
      padding: "8px 12px", // Padding for options
      fontSize: "14px", // Font size for options
      height: "60px", // Height of each option
      borderRadius:"10px",
      border: "none",
    }),
    control: (provided) => ({
      ...provided,
      window:"206px",
      border: "1px solid #7D8FB326", // Border color
      minHeight: "60px", // Minimum height of the control
      boxShadow: "none", // Remove box shadow
      borderRadius:"10px",
      backgroundColor:"#fff"

    }),
  };


  async function loadOptionsLang(_search, loadedOptions, { page }) {
    const start = (page) * LIMIT; // Calculate start index for pagination
    const searchQuersy = _search !== undefined && _search != "" ? `?search=${_search}&` : '?';
    try {
        const response = await axios.get(
            `${URL}api/admin/language/learn${searchQuersy}skip=${start}&limit=${LIMIT}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include authorization token from localStorage
                },
            }
        );
        const options = response.data.data.list.map((item) =>
        ({
            value: item._id,
            label: item.name,
            nameEng: item.nameEng,
            image: item?.imageFile,
            nativeLanguages:item?.nativeLanguages
        }));

        return {
            options: options,
            hasMore: options.length === LIMIT,
            additional: {
                page: page + 1,
            },
        };
    } catch (error) {
        console.error("Error fetching options:", error);
        return {
            options: [],
            hasMore: false,
        };
    }
};


async function loadOptionsCategory(_search, loadedOptions, { page }) {
  const start = (page) * LIMIT; // Calculate start index for pagination
  const searchQuersy = _search !== undefined && _search != "" ? `?search=${_search}&` : '?';
  try {
      const response = await axios.get(
          `${URL}api/admin/words/category${searchQuersy}skip=${start}&limit=${LIMIT}`,
          {
              headers: {
                  Authorization: `Bearer ${token}`, // Include authorization token from localStorage
              },
          }
      );
      const options = response.data.data.list.map((item) =>
      ({
          value: item._id,
          label: item.name,
          nameEng: item.nameEng,
          image: item?.imageFile
      }));

      return {
          options: options,
          hasMore: options.length === LIMIT,
          additional: {
              page: page + 1,
          },
      };
  } catch (error) {
      console.error("Error fetching options:", error);
      return {
          options: [],
          hasMore: false,
      };
  }
};

const onChange = (value) => {
  console.log(value,"log value");
  setLearningLanguageWordSelectedValue(value)
}

const onChangeCategory = (value) => {
  setSelectedCategory(value?.value)
}

  const filteredResponseCategory = categoryData?.map((lang) => {
    return {
      _id: lang._id,
      label: lang.name.toLowerCase(),
      value: lang.name,
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
      <CustomAsyncPaginate style={customStyles} onChange={onChange} current={current} placeholder="English" 
      loadOptions={loadOptionsLang} />
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
        <div className="rowInputWords">
          <CustomAntdSelect
            name={"Level"}
            rules={true}
            // width={172}
            defaultValue="Level*"
            optinData={wordlevel}
            setSelected={setSelectedLevel}
          />
          <CustomAsyncPaginate style={customStylesCategory} 
          onChange={onChangeCategory} current={current} placeholder="Category*" loadOptions={loadOptionsCategory} />

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

      <CustomUpload previewImgUrl={previewImgUrl}
        setPreviewimgUrl={setPreviewimgUrl}
        categoryShow={categoryShow}
        setCategoryShow={setCategoryShow} selectedImage={selectedImage} setSelectedImage={setSelectedImage} setIamge={setIamge} image={image} setFileList={setFileList} fileList={fileList} />
    </div>
  );
};
