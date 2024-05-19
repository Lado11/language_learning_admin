import { Routes, Route } from "react-router-dom";
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
} from "../screens";
import { StatisticsScreen } from "../components";
import { getLoginData } from "../store/slices/auth/login-slice";
import { useSelector } from "react-redux";
import { CustomHeader } from "../components/custom-header/custom-header";
import { CustomSidebar } from "../components/custom-sidebar/custom-sidebar";
import { DashboardScreen } from "../screens/dashboard-screen/dashboard-screen";
import { NativeLanguageScreen } from "../screens/native-language-screen/native-language-screen";
import { NativeLanguageCretae } from "../screens/native-language-screen/native-language-cretae-form";
import { CategoryCretae } from "../screens/category-screen/category-screen-create-from";
import { FilesScreen } from "../screens/files-screen/files-screen";
import { UserCreateScreen } from "../screens/user-screen/user-create-screen";
import { UpdateNativeLanguage } from "../screens/native-language-screen/update-native-language";

export const MyRoutes = () => {
  const token = localStorage.getItem("token");
  const loginData = useSelector(getLoginData);

  return (
    <>
      {token && loginData?.token ? (
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
        </Routes>
      ) : (
        <Routes>
          <Route element={<CustomHeader />}>
            <Route path="/" element={<HomeScreen />} />
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
              <Route path="/words" element={<WordsScreen />} />
              <Route
                path="/learning-language"
                element={<LearningLanguageScreen />}
              />
              <Route
                path="/native-language-create"
                element={<NativeLanguageCretae />}
              />
              <Route path="/category" element={<CategoryScreen />} />
              <Route path="/category-create" element={<CategoryCretae />} />
              <Route path="/user" element={<UserScreen />} />
              <Route path="/feedback" element={<FeedbackScreen />} />
              <Route path="/notification" element={<NotificationScreen />} />
              <Route path="/files" element={<FilesScreen />} />
              <Route path="/user-create" element={<UserCreateScreen />} />
              <Route
                path="/learning-language-create"
                element={<LearningLanguageCreateScreen />}
              />
              <Route path="/native-update" element={<UpdateNativeLanguage />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};
