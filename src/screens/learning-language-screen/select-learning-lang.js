import { useDispatch, useSelector } from "react-redux";
import { getNativeGetResponse, nativeLanguageGetThunk } from "../../store/slices";
import { CustomSelect } from "../../components";
import { Colors } from "../../assets/colors";
import { useEffect } from "react";
import deleteIcon from "../../assets/images/remove_icon.png"
import { ConstPagiantion } from "../../constants/const-pagination";
import { page0, page12 } from "../../constants/constants";

export const SelectLearningLang = ({ dataLanguages, onDelete, loading, rules, name }) => {
    const dispatch = useDispatch();
    const nativeLanguagesResponse = useSelector(getNativeGetResponse);
    const filteredResponse = nativeLanguagesResponse?.data?.list.map((lang) => {
        return {
            _id: lang._id,
            name: lang.name.toLowerCase(),
            nameEng: lang.name,
        };
    });
    useEffect(() => {
        dispatch(nativeLanguageGetThunk(ConstPagiantion(page0, page12)));
    }, []);

    const selectedDelete = (id) => {
        onDelete(id);
    }


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
                                <img src={lang.image} />
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