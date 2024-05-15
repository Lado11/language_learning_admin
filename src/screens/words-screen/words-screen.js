import React from 'react';
import './words-screen-style.css';
import { Colors } from '../../assets/colors';
import { CustomAddNew } from '../../components/custom-add-new/custom-add-new';
import { CustomSearchInput, CustomSelect } from '../../components';
import { useTranslation } from 'react-i18next';

export const WordsScreen = () => {
    const { t } = useTranslation();

    return (
        <div className='screensMainDiv' style={{backgroundColor: Colors.WHITE}}>
            <div className='wordsScreenAddFields'>
                <CustomAddNew title={t("ADD_NEW_WORDS")}/>
                <CustomAddNew title={t("ADD_WORDS_FROM_EXCEL")}/>
                <CustomAddNew title={t("UPDATE_WORDS_FROM_EXCEL")}/>
            </div>
            <p className='wordsScreenTitle' >
                {t("WORDS")}
            </p>
            <div className='wordScreenSelectsDiv'>
                <CustomSelect title={'Learning Language'}/>
                <CustomSelect title={'Neative Language'}/>
                <CustomSelect title={'Level'}/>
                <CustomSelect title={'Category'}/>
                <CustomSearchInput />
            </div>
            <div style={{height: 360}}>

            </div>
        </div>
    )
}