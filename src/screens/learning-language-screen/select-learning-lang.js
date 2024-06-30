import { useDispatch, useSelector } from "react-redux";
import { getNativeGetResponse, nativeLanguageGetThunk } from "../../store/slices";
import { CustomSelect, CustomSpin } from "../../components";
import { Colors } from "../../assets/colors";
import { useEffect, useState } from "react";
import deleteIcon from "../../assets/images/remove_icon.png"
import { ConstPagiantion } from "../../constants/const-pagination";
import { listItemCountForShow } from "../../constants/constants";
import { filesGetIdThunk, getfilesGetIdResponse, getfilesGetIdloading } from "../../store/slices/files/get-id-files";

export const SelectLearningLang = ({ dataLanguages, onDelete, rules, name }) => {
    const dispatch = useDispatch();
    const [imageUrls, setImageUrls] = useState({});

    const nativeLanguagesResponse = useSelector(getNativeGetResponse);
    const filteredResponse = nativeLanguagesResponse?.data?.list.map((lang) => {
        return {
            _id: lang._id,
            name: lang.name.toLowerCase(),
            nameEng: lang.name,
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


    return (
        <div>
            <CustomSelect
                rules={rules}
                name={name}
                // width={"418px"}
                data={filteredResponse}
                title="Choose Native Language *"
                optionsData={filteredResponse}
            />
            <div className="selectedNativeItem">
                {
                    dataLanguages?.map((lang) => {
                        return (
                            <div
                                key={lang._id}
                                className="selectLanguageValuesDivItem"
                                style={{ backgroundColor: Colors.BACKGROUND_COLOR }}
                            >
                                <p className="title">{lang.name}</p>
                               {selectedImageLoading ? <CustomSpin size={37} color={Colors.GRAY_COLOR} /> : <img src={imageUrls[lang.image ? lang.image: lang?.imageFile]} alt="imgae" className="selectedImage"/>}
                                <div
                                    className="deleteIcon"
                                    onClick={() => {
                                        selectedDelete(lang._id);
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