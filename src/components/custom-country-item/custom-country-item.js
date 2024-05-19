import React from 'react';
import './custom-country-item-style.css';
import { Colors } from '../../assets/colors/colors';

export const CustomCountryItem = ({ icon, title }) => {
    const url = process.env.REACT_APP_BASE_URL;
    const image = url + icon
    console.log(image.trim(),"log image")

    return (
        <>
           <div className='customCountryItem' style={{backgroundColor: Colors.BACKGROUND_COLOR}}>
                <p className='customCountryItemTitle' style={{color: Colors.LIGHT_GRAY}}>{title.length  < 15 ? title : title.slice(0,15)}</p>
                <img src={image} />
            </div>
        </>
    )
}