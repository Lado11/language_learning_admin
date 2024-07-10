import { useState } from "react";
import { Colors } from "../../assets/colors";
import { CustomAntdButton, CustomAsyncPaginate } from "../../components";
import { customStyles, customStylesExportSelect } from "../../global-styles/loadOptionsStyles";
import "./export.css";
import { Checkbox, Form } from "antd";
import { loadOptions } from "../../helper/loadOptions";
import { categoryUrl, learningLanguageUrl } from "../learning-language-screen/learning-langauge-constant";
import { AsyncPaginate } from "react-select-async-paginate";
import { wordlevel } from "../../data";
import exportIconButton from "../../assets/images/exportIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { exportGetError, exportGetLoading, exportGetResponse, exportGetThunk } from "../../store/slices/words/get-export";

export const ExportScreen = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const exportLoading = useSelector(exportGetLoading);
    const exportResponse = useSelector(exportGetResponse);
    const exportError = useSelector(exportGetError);
    const [current, setCurrent] = useState(0)
    const [learningLanguageWordSelectedValue, setLearningLanguageWordSelectedValue] = useState();
    const [selectedLevel, setSelectedLevel] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [checkBox, setCheckBox] = useState(false);

    const onChangeCheckBox = (e) => {
        setCheckBox(e.target.checked);
    };

    const onChangeLanguage = (value) => {
        setLearningLanguageWordSelectedValue(value)
    }
    const onChangeCategory = (value) => {
        setSelectedCategory(value?.value)
    }

    const onChangeLevel = (value) => {
        setSelectedLevel(value?.value)
    }

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

    const data = {
        language: learningLanguageWordSelectedValue?.value,
        category: selectedCategory,
        level: selectedLevel,
        categoryName: checkBox
    }


    const onFinish = (values) => {
        dispatch(exportGetThunk(data))
    }

    return (
        <div className="nativeLanguageScreenMainDiv">
            <Form form={form}
                onFinish={onFinish}
                autoComplete="off" className="formExport">
                <p className="exportTitle">Export</p>

                <div className="exportSelectSection">
                    <p className="exportSelectLabel">Language</p>

                    <div className="selectFormItemSection">
                        <Form.Item
                            name="Leaning Language"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <CustomAsyncPaginate
                                style={customStylesExportSelect}
                                onChange={onChangeLanguage}
                                current={current}
                                placeholder="English"
                                loadOptions={handleLoadOptions} />
                        </Form.Item>
                    </div>
                </div>

                <div className="exportSelectSection">
                    <p className="exportSelectLabel">Category</p>

                    <div className="selectFormItemSection">
                        <Form.Item
                            name="Category"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <CustomAsyncPaginate
                                style={customStylesExportSelect}
                                onChange={onChangeCategory}
                                current={current}
                                placeholder="Category*"
                                loadOptions={handleLoadOptionsCategory} />
                        </Form.Item>
                    </div>
                </div>

                <div className="exportSelectSection">
                    <p className="exportSelectLabel">Level</p>

                    <div className="selectFormItemSection">
                        <Form.Item
                            className="formItemSelect"
                            name="Level"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <AsyncPaginate
                                styles={customStylesExportSelect}
                                placeholder={"Level"}
                                onChange={onChangeLevel}
                                loadOptions={handleLoadOptionsLevel}
                                additional={{
                                    page: current, // Initial page
                                }}
                                options={wordlevel}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="exportCheckBoxSection">
                    <Checkbox onChange={onChangeCheckBox}>Category with name</Checkbox>
                </div>
                <Form.Item>
                    <CustomAntdButton
                        icon={exportIconButton}
                        title="Export"
                        background={Colors.PURPLE}
                        loading={exportLoading}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}