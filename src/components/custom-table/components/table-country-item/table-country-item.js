import React from 'react';
import './table-country-item-style.css';

export const TableCountryItem = ({ image, title }) => {
    return (
        <div className='tableCountryItemMainDiv'>
            <img src={image} className='tableCountryItemImg'/>
            <p>{title}</p>
        </div>
    )
}