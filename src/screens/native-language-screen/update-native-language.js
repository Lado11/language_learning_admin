import React, { useEffect, useState } from "react";
import { Form, Upload, } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteNativeCreateBool, getNativeCreateBool, nativeLanguageCreateThunk } from "../../store/slices/native-language/native-language-create";
import uploadIcon from  "../../assets/images/uploadImg.png";
import { CustomAntdButton } from "../../components/custom-antd-button/custom-antd-button";
import { Colors } from "../../assets/colors";
import { useNavigate } from "react-router-dom";
import { CustomAntdInput } from "../../components";
import { getNativeGetResponse } from "../../store/slices/native-language/native-language-get";

export const UpdateNativeLanguage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = new FormData();
    const nativeCreateBool = useSelector(getNativeCreateBool);
    const [fileList, setFileList] = useState([]);
    const [categoryShow, setCategoryShow] = useState();
    const [showCategoryUpload, setCatgeoryShowUpload] = useState();
    const nativeLanguageData = useSelector(getNativeGetResponse);
    const nativeData = nativeLanguageData?.data?.list?.[0];
    console.log(nativeData?.[0], "log ddddddddddddd")

    const onFinish = (values) => {
        console.log(values, "values")
        if (values.image.file != "") {
            formData.append('nameEng', values.nameEng);
            formData.append('name', values.name);
            formData.append('image', categoryShow);
            console.log(categoryShow, "logg")
            dispatch(nativeLanguageCreateThunk(formData));
            form.resetFields();
            setCategoryShow("")

        }
        else {
            console.log(values, "values")
        }
    };

    useEffect(() => {
        if (nativeCreateBool === true) {
        }
        dispatch(deleteNativeCreateBool())
    }, [nativeCreateBool])

    const handleChange = (info) => {
        console.log(info, "info")
        setCategoryShow(info.file)
        setCatgeoryShowUpload(info.fileList[0])
        if (!info.fileList[0]) {
            info.file = ""
        }
    };


    const beforeUpload = () => {
        return false;
    };

    const props = {
        accept: ".png",
        onRemove: (file) => {
            console.log(file, "logg")
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
        },
    };


    useEffect(() => {
        form.setFieldsValue({
            nameEng: nativeData?.nameEng,
            name: nativeData?.name,
            image: nativeData?.imageFile?.path
        });
    }, [nativeData]);

    return (
        <div className="nativeLanguageScreenMainDiv">
            <p className='nativeLanguageTitle'>Update Native Language</p>
            <Form
                autoComplete="off"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <p>Language english name</p>
                <CustomAntdInput name="nameEng" placeholder=" Language English Name*" />
                <p>Native Name</p>

                <CustomAntdInput name="name" placeholder="Native Name*" />

                <p>Language Icon</p>

                <Form.Item
                    name="image"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Upload
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        {...props}
                        maxCount={1}
                        listType="picture"
                        className="upload-list-inline"
                    >
                        {categoryShow && showCategoryUpload ? null : <img src={uploadIcon} className="upload" />}
                    </Upload>
                </Form.Item>


                <Form.Item>
                    <CustomAntdButton title="Update" background={Colors.PURPLE} />
                    <CustomAntdButton title="Delete" background={Colors.GRAY_COLOR} />

                </Form.Item>
            </Form>
        </div>
    )
}