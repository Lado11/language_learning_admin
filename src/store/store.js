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
  createWordsSlice,
} from "./slices";
import { categoryUpdateSlice } from "./slices/category/update-category";
import { nativeLanguageGetIdSlice } from "./slices/native-language/get-id-native-language";
import { categoryGetIdSlice } from "./slices/category/get-id-category";
import { dashboardGetSlice } from "./slices/dashboard/get-dashboard";
import { craeteExelWordsSlice } from "./slices/words/post-exel-word";
import { updateExelWordsSlice } from "./slices/words/put-exel-word";
import { sendPushNotificationSlice } from "./slices/notification/send_push_notification";
import { sendEmailNotificationSlice } from "./slices/notification/send_email_notification";
import { getWordsIdSlice } from "./slices/words/getId-words";
import { getWordsDeleteSlice } from "./slices/words/delete_words-slice";
import { wordsUpdateSlice } from "./slices/words/update-words-slice";
import { feedBackGetSlice } from "./slices/feedBack/get-feedback";
import { wordsExelDeleteSlice } from "./slices/words/delete-exel-words";
import { wordsExelGetSlice } from "./slices/words/get-exel-words";
import { feedBackGetIdSlice } from "./slices/feedBack/getId-feadback";
import { wordsExelGetIdSlice } from "./slices/words/getId-exel-words";
import { filesGetIdSlice } from "./slices/files/get-id-files";
import { voiceGetIdSlice } from "./slices/files/get-id-voice";

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
    craeteExelWordsSlice:craeteExelWordsSlice.reducer,
    dashboardGetSlice:dashboardGetSlice.reducer,
    updateExelWordsSlice:updateExelWordsSlice.reducer,
    createWordsSlice:createWordsSlice.reducer,
    getWordsIdSlice:getWordsIdSlice.reducer,
    wordsExelGetSlice:wordsExelGetSlice.reducer,
    getWordsDeleteSlice:getWordsDeleteSlice.reducer,
    wordsExelDeleteSlice:wordsExelDeleteSlice.reducer,
    wordsUpdateSlice:wordsUpdateSlice.reducer,
    sendPushNotificationSlice:sendPushNotificationSlice.reducer,
    sendEmailNotificationSlice:sendEmailNotificationSlice.reducer,
    feedBackGetSlice:feedBackGetSlice.reducer,
    feedBackGetIdSlice:feedBackGetIdSlice.reducer,
    wordsExelGetIdSlice:wordsExelGetIdSlice.reducer,
    filesGetIdSlice:filesGetIdSlice.reducer,
    voiceGetIdSlice:voiceGetIdSlice.reducer
  },
});
