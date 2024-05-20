import countryIcon from "../assets/images/countryIcon.svg";
import { TableCountryItem, TableSubscribeButton } from "../components";

export const customTableCountryData = {
  image: countryIcon,
  title: "England",
};

export const customTableColumns = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "User",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Device ID",
    dataIndex: "deviceId",
    key: "deviceId",
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
    title: "Action",
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
