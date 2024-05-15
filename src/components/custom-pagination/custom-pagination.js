import React from 'react';
import { Pagination } from 'antd';
import "./custom-pagination.css"


export const CustomPagination = (length) => {
    console.log(length.length,"log length");

    const onShowSizeChange = (current, pageSize) => {
    };
    return (
        <div>
            <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                total={length?.length}
            />
        </div>
    )
}