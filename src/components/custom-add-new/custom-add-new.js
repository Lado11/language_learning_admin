import React from 'react';
import plusIcon from '../../assets/images/plusIcon.svg';
import './custom-add-new-style.css';
import { Colors } from '../../assets/colors/colors';

export const CustomAddNew = ({ title,onClick }) => {
    return (
        <div className='customAddNewMainDiv' onClick={onClick}>
            <img src={plusIcon} className='customAddNewPlusIcon'/>
            <p style={{color: Colors.LIGHT_GRAY}} className='customAddNewTitle'>{title}</p>
        </div>
    )
}