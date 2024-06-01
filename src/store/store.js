import { configureStore } from "@reduxjs/toolkit";
import {
  loginSlice,
  nativeLanguageCreateSlice,
  nativeLanguageGetSlice,
  categoryCreateSlice,
  userCreateSlice,
  userDeleteSlice,
  userUpdateSlice,
  userGetAllSlice,
  userGetByIdSlice,
  categoryDeleteSlice,
  categoryGetSlice,
  nativeLanguageDeleteSlice,
  nativeLanguageUpdateSlice,
  learningLanguagesSlice,
  createLearnLanguageSlice,
  learnLanguageDeleteSlice,
  learnLanguageByIdSlice,
  learnLanguageUpdateSlice,
  getWordsSlice,
  sendEmailSlice,
  sendCodeSlice,
  resetPasswordSlice,
} from "./slices";
import { categoryUpdateSlice } from "./slices/category/update-category";
import { nativeLanguageGetIdSlice } from "./slices/native-language/get-id-native-language";
import { categoryGetIdSlice } from "./slices/category/get-id-category";
import { dashboardGetSlice } from "./slices/dashboard/get-dashboard";

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    sendEmailSlice: sendEmailSlice.reducer,
    sendCodeSlice: sendCodeSlice.reducer,
    resetPasswordSlice: resetPasswordSlice.reducer,
    createNativeSlice: nativeLanguageCreateSlice.reducer,
    getNativeSlice: nativeLanguageGetSlice.reducer,
    nativeLanguageDeleteSlice: nativeLanguageDeleteSlice.reducer,
    nativeLanguageUpdateSlice: nativeLanguageUpdateSlice.reducer,
    getIdNativeSlice: nativeLanguageGetIdSlice.reducer,
    categoryCreateSlice: categoryCreateSlice.reducer,
    userCreateSlice: userCreateSlice.reducer,
    userDeleteSlice: userDeleteSlice.reducer,
    userUpdateSliceStore: userUpdateSlice.reducer,
    userGetAllSlice: userGetAllSlice.reducer,
    userGetByIdSlice: userGetByIdSlice.reducer,
    categoryDeleteSlice: categoryDeleteSlice.reducer,
    categoryUpdateSlice: categoryUpdateSlice.reducer,
    categoryGetSlice: categoryGetSlice.reducer,
    categoryGetIdSlice: categoryGetIdSlice.reducer,
    learningLanguagesSlice: learningLanguagesSlice.reducer,
    createLearnLanguageSlice: createLearnLanguageSlice.reducer,
    learnLanguageDeleteSlice: learnLanguageDeleteSlice.reducer,
    learnLanguageByIdSlice: learnLanguageByIdSlice.reducer,
    learnLanguageUpdateSlice: learnLanguageUpdateSlice.reducer,
    getWordsSlice: getWordsSlice.reducer,
    dashboardGetSlice:dashboardGetSlice.reducer
  },
});
