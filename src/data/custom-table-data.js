import countryIcon from "../assets/images/countryIcon.svg";
import { TableCountryItem, TableSubscribeButton } from "../components";

export const customTableCountryData = {
  image: countryIcon,
  title: "England",
};

let num = 1;

export const customTableColumns = [
  {
    title: "Word",
    dataIndex: "_id",
    key: "_id",
    render: (text) => {
      const newTag = <a>{num}</a>;
      num++;
      return newTag;
    },
    className: "column-id",
  },
  {
    title: "Language",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Translate",
    dataIndex: "email",
    key: "email",
    className: "column-email",
  },
  {
    title: "Category",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Level",
    dataIndex: "devices",
    key: "devices",
    className: "column-device-id",
  },
  {
    title: "Status",
    key: "country",
    dataIndex: "country",
    render: () => (
      <>
        <TableCountryItem
          image={customTableCountryData.image}
          title={customTableCountryData.title}
        />
      </>
    ),
  },
  {
    title: "Status",
    key: "action",
    render: () => (
      <>
        <TableSubscribeButton />
      </>
    ),
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
    text: "Id",
  },
  {
    text: "User",
    id: "firstName",
    key: "firstName",
  },
  {
    text: "Email",
    id: "email",
    key: "email",
  },
  {
    text: "Phone",
    id: "phoneNumber",
    key: "phoneNumber",
  },
  {
    text: "Device ID",
    id: "phoneNumber",
    key: "devices",
  },
  {
    text: "Country",
    id: "phoneNumber",
    key: "devices",
  },
  {
    text: "Status",
    id: "phoneNumber",
    key: "devices",
  },
  
];
