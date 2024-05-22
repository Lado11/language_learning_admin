import React from "react";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { nativeLanguageGetThunk } from "../../store/slices/native-language/native-language-get";
import "./custom-pagination.css";
import { categoryGetThunk } from "../../store/slices/category/get-category";

export const CustomPagination = (length) => {
  const onShowSizeChange = (current, pageSize) => {};
  const dispatch = useDispatch();

  const onChange = (current) => {
    const skip = 1 ? current - 1 : current + 10;

    const data = {
      skip: skip,
      limit: 12,
    }

    dispatch(categoryGetThunk(data));
    dispatch(nativeLanguageGetThunk(data));
  };

  return (
    <div>
      <Pagination
        onChange={onChange}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={1}
        total={length?.length}
      />
    </div>
  );
};
