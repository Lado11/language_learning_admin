import React from "react";
import "./custom-table-style.css";
import { Table } from "antd"; // Tag , Space
import {
  customTableData,
  customTableColumns,
} from "../../data/custom-table-data";

export const CustomTable = ({tableData}) => {
  return(
    <Table
    columns={customTableColumns}
    dataSource={tableData}
    className="customTable"
  />
  )
};
