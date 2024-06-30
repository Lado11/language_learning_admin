import { Routes, Route, Navigate, useParams, useLocation, Outlet } from "react-router-dom";
import { redirect, } from "react-router-dom";

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
import { FilesMore } from "../screens/files-screen/files-more";

export const MyRoutes = () => {
  const token = localStorage.getItem("token");
  const reduxToken = useSelector(getToken);
  let { id } = useParams();
  const location = useLocation().pathname


  const PublicRoutes = () => {
  
    return location === "/" ? <Navigate to={'/dashboard'} replace /> : <Outlet />
  }
  
  return (
    <>
      {!token && !reduxToken ? (
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/recover" element={<ResetPasswordEmail />} />
          <Route path="/recover/password" element={<ResetSendPasswordScreen />} />
          <Route
            path="/rescover/code"
            element={<EmailVeraficationScreen />}
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<CustomHeader />}>
            <Route element={<CustomSidebar />}>
                <Route path="/" element={<PublicRoutes />}/>
                <Route path="/dashboard" element={<DashboardScreen />} />

                <Route path="/statistics" element={<StatisticsScreen />} />
                <Route
                  path="/native-language"
                  element={<NativeLanguageScreen />}
                />
                <Route path="native-language/:id" element={<UpdateNativeLanguage />} />
                <Route
                  path="/native-language/create"
                  element={<NativeLanguageCretae />}
                />
                <Route
                  path="/learning-language"
                  element={<LearningLanguageScreen />}
                />
                 <Route
                  path="/learning-language/create"
                  element={<LearningLanguageCreateScreen />}
                />
                <Route
                  path="/learning-language/:id"
                  element={<LearningLanguageUpdate />}
                />
               
                <Route path="/category" element={<CategoryScreen />} />
                <Route path="/category/:id" element={<CategoryUpdate />} />
                <Route path="/category/create" element={<CategoryCretae />} />
                <Route path="/user" element={<UserScreen />} />
                <Route path="/feedback" element={<FeedbackScreen />} />
                <Route path="/feedback/:id" element={<FeadBackMoreScreen />} />
                <Route path="/notification" element={<NotificationScreen />} />
                <Route path="/files" element={<FilesScreen />} />
                <Route path="/files/more/:id" element={<FilesMore />} />
                <Route path="/user/create" element={<UserCreateScreen />} />
                <Route path="/user/:id" element={<UserScreenUpdate />} />
               

                <Route path="/upload/:id" element={<UplaodProcessScreen />} />

                <Route path="/words" element={<WordsScreen />} />
                <Route path="/upload" element={<UplaodScreen />} />
                <Route path="/words/create" element={<WordsCreateScreen />} />
                <Route path="/upload/create-words-from-excel" element={<AddWordExel />} />
                <Route path="/upload/update-words-from-excel" element={<UpdateExelFromWord />} />
                <Route path="/words/:id" element={<WordsUpdate />} />

            </Route>
            <Route path="*" element={<Navigate to={"/"} />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
