import countryIcon from "../assets/images/countryIcon.svg";
import { TableCountryItem, TableSubscribeButton } from "../components";

export const customTableCountryData = {
  image: countryIcon,
  title: "England",
};


export const customTableColumns = [
  {
    title: "Word",
    dataIndex: "word",
    key: "word",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Translate",
    dataIndex: "translate",
    key: "translate",

  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Status",
    dataIndex: "active",
    key: "active",
  },
];

export const customTableData = [
  {
    key: "1",
    name: "John Brown",
    email: "jnersisyan@internet.ru",
    phone: "+37498623462",
    deviceId: "123456789",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    email: "jnersisyan@internet.ru",
    phone: "+37498623462",
    deviceId: "123456789",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    email: "jnersisyan@internet.ru",
    phone: "+37498623462",
    deviceId: "123456789",
    tags: ["cool", "teacher"],
  },
];


export const columns = [
  {
    id: "_id",
    title: "Id",
  },
  {
    title: "User",
    id: "firstName",
    key: "firstName",
  },
  {
    title: "Email",
    id: "email",
    key: "email",
  },
  {
    title: "Phone",
    id: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Device ID",
    id: "phoneNumber",
    key: "devices",
  },
  {
    title: "Country",
    id: "phoneNumber",
    key: "devices",
  },
  {
    title: "Status",
    id: "phoneNumber",
    key: "devices",
  },
  
];

export const columnsUpload = [
  {
    id: " ID",
    title: " ID",
  },
  {
    title: "type ",
    id: "type ",
    key: "type ",
  },
  {
    title: "Errors",
    id: "Errors",
    key: "Errors",
  },
  {
    title: "Succsess / Words",
    id: "Succsess / Words",
    key: "Succsess / Words",
  },
  {
    title: "Status",
    id: "Status",
    key: "Status",
  },
  {
    title: "Start Date",
    id: "Start Date",
    key: "Start Date",
  },
];
