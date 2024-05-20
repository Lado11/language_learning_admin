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
  DashboardScreen,
  NativeLanguageScreen,
  NativeLanguageCretae,
  CategoryCretae,
  FilesScreen,
  UserCreateScreen,
  UpdateNativeLanguage,
  LearningLanguageUpdate,
} from "../screens";
import { CustomHeader, CustomSidebar, StatisticsScreen } from "../components";
import { getLoginData } from "../store/slices/auth/login-slice";
import { useSelector } from "react-redux";

export const MyRoutes = () => {
  const token = localStorage.getItem("token");
  const loginData = useSelector(getLoginData);

  return (
    <>
      {!token && !loginData?.token ? (
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
              <Route
                path="/learning-update"
                element={<LearningLanguageUpdate />}
              />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};
