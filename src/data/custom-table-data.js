import countryIcon from "../assets/images/countryIcon.svg";
import { TableCountryItem, TableSubscribeButton } from "../components";

export const customTableCountryData = {
  image: countryIcon,
  title: "England",
};

export const customTableColumns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "User",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Device ID",
    dataIndex: "devices",
    key: "devices",
  },
  {
    title: "Country",
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
