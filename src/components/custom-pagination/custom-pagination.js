import React from "react";
import { Pagination } from "antd";
import "./custom-pagination.css";



export const CustomPagination = ({length, pageLength, onChange }) => {
  const pageCount = (length / pageLength) * 10
  const roundNumber = pageCount ? Math.ceil(pageCount) : 1

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
