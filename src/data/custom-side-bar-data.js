import { Colors } from "../assets/colors/colors";
import {
  dashboardIcon,
  nativeLanguageIcon,
  learningLanguageIcon,
  wordsIcon,
  categoryIcon,
  userIcon,
  feedbackIcon,
  notificationIcon,
  filesIcon,
} from "./svgs-data";

export const customSideBarData = [
  {
    icon: dashboardIcon,
    title: "DASHBOARD",
    color: Colors.BLUE,
    path: "/dashboard",
  },
  {
    icon: nativeLanguageIcon,
    title: "NATIVE_LANGUAGE",
    color: Colors.PURPLE,
    path: "/native-language",
  },
  {
    icon: learningLanguageIcon,
    title: "LEARNING_LANGUAGE",
    color: Colors.ORANGE,
    path: "/learning-language",
  },
  {
    icon: wordsIcon,
    title: "WORDS",
    color: Colors.BLUE,
    path: "/words",
  },
  {
    icon: categoryIcon,
    title: "CATEGORY",
    color: Colors.GREEN,
    path: "/category",
  },
  {
    icon: userIcon,
    title: "USER",
    color: Colors.YELLOW,
    path: "/user",
  },
  {
    icon: feedbackIcon,
    title: "FEEDBACK",
    color: Colors.PURPLE,
    path: "/feedback",
  },
  {
    icon: notificationIcon,
    title: "NOTIFICATION",
    color: Colors.ORANGE,
    path: "/notification",
  },
  {
    icon: filesIcon,
    title: "FILES",
    color: Colors.GREEN,
    path: "/files",
  },
];
