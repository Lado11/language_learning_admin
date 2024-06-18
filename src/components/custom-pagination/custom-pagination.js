import React from "react";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { nativeLanguageGetThunk } from "../../store/slices/native-language/native-language-get";
import "./custom-pagination.css";
import { categoryGetThunk } from "../../store/slices/category/get-category";
import { getWordsThunk, learningLanguagesThunk, userGetAllThunk } from "../../store/slices";

export const CustomPagination = ({length  ,pageLength}) => {
  const dispatch = useDispatch();
  const pageCount = (length / pageLength) * 10
  const roundNumber = pageCount ? Math.ceil(pageCount) : 1
  const onChange = (current) => {
    const skip =( current -1 ) * pageLength;
    const data = {
      skip: skip,
      limit: 12,
    }
    const dataUser = {
      skip: skip,
      limit: 5,
    };
    dispatch(getWordsThunk(dataUser));
    dispatch(userGetAllThunk(dataUser));
    dispatch(learningLanguagesThunk(data));
    dispatch(categoryGetThunk(data));
    dispatch(nativeLanguageGetThunk(data));
  };

  return (
    <div>
      <Pagination
        onChange={onChange}
        showSizeChanger
        defaultCurrent={1}
        total={roundNumber}
      />
    </div>
  );
};
