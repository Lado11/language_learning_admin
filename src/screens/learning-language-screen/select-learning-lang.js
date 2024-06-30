import { useDispatch, useSelector } from "react-redux";
import { addLanguages, addLearnLanguageSelectedLanguages, getNativeGetResponse, nativeLanguageGetThunk } from "../../store/slices";
import { CustomSelect, CustomSpin } from "../../components";
import { Colors } from "../../assets/colors";
import { useEffect, useState } from "react";
import deleteIcon from "../../assets/images/remove_icon.png"
import { ConstPagiantion } from "../../constants/const-pagination";
import { listItemCountForShow } from "../../constants/constants";
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from "../../store/slices/files/get-id-files";
import { AsyncPaginate } from "react-select-async-paginate";

export const SelectLearningLang = ({ dataLanguages, onDelete, rules, name,loadOptions,current }) => {
    const dispatch = useDispatch();
    const [imageUrls, setImageUrls] = useState({});
    const nativeLanguagesResponse = useSelector(getNativeGetResponse);
    const filteredResponse = nativeLanguagesResponse?.data?.list.map((lang) => {
        return {
            _id: lang._id,
            name: lang.name.toLowerCase(),
            nameEng: lang.nameEng,
            image:lang?.imageFile
        };
    });

    useEffect(() => {
        dispatch(nativeLanguageGetThunk(ConstPagiantion(0, listItemCountForShow)));
    }, []);

    const selectedDelete = (id) => {
        onDelete(id);
    }

    const categoryImageResponse = useSelector(getfilesGetIdResponse);
    const selectedImageLoading = useSelector(getfilesGetIdloading);
  
    const fetchImage = (imageFileId) => {
      if (!imageUrls[imageFileId]) {
        dispatch(filesGetIdThunk(imageFileId));
      }
    };
  
    useEffect(() => {
      // Preload image URLs
      if (dataLanguages) {
        dataLanguages.forEach((item) => {
          fetchImage(item.image ? item.image : item.imageFile);
        });
      }
    }, [dataLanguages]);
  
    useEffect(() => {
      // Update imageUrls state with fetched image URLs
      if (categoryImageResponse?.data?.url) {
        setImageUrls((prevUrls) => ({
          ...prevUrls,
          [categoryImageResponse.data.fileId]: categoryImageResponse.data.url,
        }));
      }
    }, [categoryImageResponse]);


    const handleChange = (value) => {
        dispatch(addLanguages(value));
        dispatch(addLearnLanguageSelectedLanguages(value));
      };
      const customStyles = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#fff" : "#fff", // Background color for selected options
          color: state.isSelected ? "#fff" : "#333", // Text color for selected options
          padding: "8px 12px", // Padding for options
          fontSize: "14px", // Font size for options
          height: "60px", // Height of each option
          borderRadius:"10px"
        }),
        control: (provided) => ({
          ...provided,
          border: "1px solid #7D8FB326", // Border color
          minHeight: "60px", // Minimum height of the control
          boxShadow: "none", // Remove box shadow
          borderRadius:"10px"

        }),
      };
    return (
        <div>
            <AsyncPaginate
            styles={customStyles}
            placeholder="Choose Native Language *"
                onChange={handleChange}
                loadOptions={loadOptions}
                additional={{
                  page: current, // Initial page
                }}
              />
            
            <div className="selectedNativeItem">
                {
                    dataLanguages?.map((lang) => {
                        return (
                            <div
                                key={lang?._id}
                                className="selectLanguageValuesDivItem"
                                style={{ backgroundColor: Colors.BACKGROUND_COLOR }}
                            >
                                <p className="title">{lang?.label ? lang?.label : lang?.name}</p>
                               {selectedImageLoading ? <CustomSpin size={37} color={Colors.GRAY_COLOR} /> : <img src={imageUrls[lang?.imageFile ? lang?.imageFile: lang?.image]} alt="imgae" className="selectedImage"/>}
                                <div
                                    className="deleteIcon"
                                    onClick={() => {
                                        selectedDelete(lang?.value ? lang?.value : lang?.id);
                                    }}
                                >
                                    <img src={deleteIcon} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}