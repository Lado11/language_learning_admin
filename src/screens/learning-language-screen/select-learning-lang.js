import { useSelector } from "react-redux";
import { getNativeGetResponse } from "../../store/slices";
import { CustomSelect } from "../../components";
import { Colors } from "../../assets/colors";

export const SelectLearningLang = ({ dataLanguages, onDelete, loading }) => {
    const nativeLanguagesResponse = useSelector(getNativeGetResponse);

    const filteredResponse = nativeLanguagesResponse?.data?.list.map((lang) => {
        return {
            _id: lang.id,
            name: lang.name.toLowerCase(),
            nameEng: lang.name,
        };
    });

    // const onDelete = (id) => {
    //   dispatch(removeSelectedLanguagesItem(id));
    // };
    const selectedDelete = (id) => {
        onDelete(id);
    }


    return (
        <div>
            <CustomSelect
            width={"418px"}
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
                            <span>{lang.name}</span>
                            <img src={lang.image} />
                            <div
                                className="deleteIcon"
                                onClick={() => {
                                    selectedDelete(lang._id);
                                }}
                            >
                                <span>x</span>
                            </div>
                        </div>
                    );
                })
            }
            </div>
        </div>
    )
}