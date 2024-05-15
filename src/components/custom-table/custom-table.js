import React from 'react';
import './custom-table-style.css';
import { Space, Table, Tag } from 'antd';
import countryIcon from '../../assets/images/countryIcon.svg';
import { TableCountryItem } from './components/table-country-item/table-country-item';
import { TableSubscribeButton } from './components/table-subscribe-button/table-subscribe-button';

const countryData = {
    image: countryIcon,
    title: 'England'
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'User',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Device ID',
    dataIndex: 'deviceId',
    key: 'deviceId',
  },
  {
    title: 'Country',
    key: 'country',
    dataIndex: 'country',
    render: () => (
      <>
        <TableCountryItem image={countryData.image} title={countryData.title}/>
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <>
        <TableSubscribeButton />
      </>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    email: 'jnersisyan@internet.ru',
    phone: '+37498623462',
    deviceId: '123456789',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    email: 'jnersisyan@internet.ru',
    phone: '+37498623462',
    deviceId: '123456789',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    email: 'jnersisyan@internet.ru',
    phone: '+37498623462',
    deviceId: '123456789',
    tags: ['cool', 'teacher'],
  },
];

export const CustomTable = () => <Table columns={columns} dataSource={data} className='customTable'/>;