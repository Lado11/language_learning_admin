import { Routes, Route, Navigate, useParams } from "react-router-dom";
import {
  CategoryScreen,
  HomeScreen,
  LearningLanguageScreen,
  LoginScreen,
  ResetPasswordEmail,
  ResetSendPasswordScreen,
  WordsScreen,
  EmailVeraficationScreen,
  UserScreen,
  FeedbackScreen,
  NotificationScreen,
  LearningLanguageCreateScreen,
  DashboardScreen,
  NativeLanguageScreen,
  NativeLanguageCretae,
  CategoryCretae,
  FilesScreen,
  UserCreateScreen,
  UpdateNativeLanguage,
  LearningLanguageUpdate,
  WordsCreateScreen,
} from "../screens";
import { CustomHeader, CustomSidebar, StatisticsScreen } from "../components";
import { getToken } from "../store/slices/auth/login-slice";
import { useSelector } from "react-redux";
import { CategoryUpdate } from "../screens/category-screen/category-update";
import { UserScreenUpdate } from "../screens/user-screen/user-screen-update";
import { AddWordExel } from "../screens/words-screen/add-word-exel/add-word-exel";
import { UpdateExelFromWord } from "../screens/words-screen/add-word-exel/update-word-from-exel";
import { WordsUpdate } from "../screens/words-screen/words-update/words-update";
import { UplaodScreen } from "../screens/upload/upload-screen";
import { UplaodProcessScreen } from "../screens/upload/upload-proccessing";
import { FeadBackMoreScreen } from "../screens/feedback-screen/feadback-more-screen";

export const MyRoutes = () => {
  const token = localStorage.getItem("token");
  const reduxToken = useSelector(getToken);
  let { id } = useParams();

  return (
    <>
      {!token && !reduxToken ? (
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/sendEmail" element={<ResetPasswordEmail />} />
          <Route path="/resetPassword" element={<ResetSendPasswordScreen />} />
          <Route
            path="/emailVerafication"
            element={<EmailVeraficationScreen />}
          />
          <Route path="/" element={<LoginScreen />} />
          <Route path="/resetPassword" element={<ResetSendPasswordScreen />} />
          <Route path="/sendEmail" element={<ResetSendPasswordScreen />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<CustomHeader />}>
            <Route element={<CustomSidebar />}>
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/statistics" element={<StatisticsScreen />} />
              <Route
                path="/native-language"
                element={<NativeLanguageScreen />}
              />
              <Route
                path="/native-language-create"
                element={<NativeLanguageCretae />}
              />
              <Route
                path="/learning-language"
                element={<LearningLanguageScreen />}
              />
              <Route
                path="/native-language-create"
                element={<NativeLanguageCretae />}
              />
              <Route path="/category" element={<CategoryScreen />} />
              <Route path="/category/:id" element={<CategoryUpdate />} />
              <Route path="/category-create" element={<CategoryCretae />} />
              <Route path="/user" element={<UserScreen />} />
              <Route path="/feedback" element={<FeedbackScreen />} />
              <Route path="/feadback/:id" element={<FeadBackMoreScreen />}/>
              <Route path="/notification" element={<NotificationScreen />} />
              <Route path="/files" element={<FilesScreen />} />
              <Route path="/user-create" element={<UserCreateScreen />} />
              <Route path="/user/:id" element={<UserScreenUpdate />} />
              <Route
                path="/learning-language-create"
                element={<LearningLanguageCreateScreen />}
              />
              <Route path="native-language/:id" element={<UpdateNativeLanguage />} />
              <Route
                path="/learning-language/:id"
                element={<LearningLanguageUpdate />}
              />
       
             <Route path="/upload/:id" element={<UplaodProcessScreen />}/>

              <Route path="/words" element={<WordsScreen />} />
              <Route path="/upload" element={<UplaodScreen />} />
              <Route path="/create-word" element={<WordsCreateScreen />} />
              <Route path="/create-word-exel" element={<AddWordExel />} />
              <Route path="/update-word-exel" element={<UpdateExelFromWord />}/>
              <Route path="/words/:id" element={<WordsUpdate />}/>
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};
