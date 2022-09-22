import React from 'react';
import { Table, Tag } from 'antd';
import BROKERS from '../../lib/db/brokers.json';
import ACCOUNT_STATUS from '../../lib/db/accountStatus.json';
import { useNavigate, Link } from 'react-router-dom';
import { getChangedDate } from '../../lib';
import styled from 'styled-components';
import color from '../../styles/color';
import { useCustomRouter } from '../../hooks';

const columns = [
  {
    title: '고객명',
    dataIndex: 'userName',
    render: (text, record) => (
      <Link
        to={`/user/${text}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {record.users.find((user) => user.id === text).name}
      </Link>
    ),
  },
  {
    title: '브로커명',
    dataIndex: 'brokerName',
    render: (text) => BROKERS[text],
    filters: Object.values(BROKERS).map((broker, brokerIndex) => {
      return {
        text: broker,
        value: Object.keys(BROKERS)[brokerIndex],
      };
    }),
    onFilter: (value, record) => {
      console.info(value);
      return value === record.brokerName;
    },
  },
  {
    title: '계좌번호',
    dataIndex: 'number',
    render: (text) => {
      const maskingRegex = /(?<=.{2})(?=.{3})./gi;
      return text.replace(maskingRegex, '*');
    },
  },
  {
    title: '계좌상태',
    dataIndex: 'status',
    render: (text) => {
      return Object.values(ACCOUNT_STATUS).map((accountStatus, statusIndex) => {
        const accountStatusNames = Object.keys(ACCOUNT_STATUS);
        return accountStatus === text && accountStatusNames[statusIndex];
      });
    },
    filters: Object.keys(ACCOUNT_STATUS).map((status, statusIndex) => {
      return {
        text: status,
        value: Object.values(ACCOUNT_STATUS)[statusIndex],
      };
    }),
    onFilter: (value, record) => {
      return value === record.status;
    },
  },
  { title: '계좌명', dataIndex: 'name' },
  {
    title: '평가금액',
    dataIndex: 'assets',
    render: (text, record) => {
      return (
        <NumberSpan
          status={
            text === record.payments
              ? 'equal'
              : text > record.payments
              ? 'over'
              : 'less'
          }
        >
          {Number(parseInt(text)).toLocaleString()}
        </NumberSpan>
      );
    },
  },
  {
    title: '입금금액',
    dataIndex: 'payments',
    render: (text) => Number(parseInt(text)).toLocaleString(),
  },
  {
    title: '계좌활성여부',
    dataIndex: 'isActive',
    render: (text) => (
      <Tag color={`${text ? 'green' : 'default'}`}>
        {text ? '활성' : '비활성'}
      </Tag>
    ),
    filters: [
      {
        text: '활성',
        value: true,
      },
      {
        text: '비활성',
        value: false,
      },
    ],
    onFilter: (value, record) => {
      return value === record.isActive;
    },
  },
  {
    title: '계좌개설일',
    dataIndex: 'createdAt',
    render: (text) => getChangedDate(text),
  },
];

function AccountTable({ accounts, users, loading }) {
  const navigate = useNavigate();
  const {
    changeParams,
    currentParams: { page },
  } = useCustomRouter();

  const accountList = accounts.map((account) => {
    const {
      id,
      user_id,
      broker_id,
      uuid,
      name,
      created_at,
      number,
      status,
      assets,
      payments,
      is_active,
    } = account;
    return {
      key: uuid,
      userName: user_id,
      brokerName: broker_id,
      createdAt: created_at,
      isActive: is_active,
      status,
      name,
      number,
      assets,
      payments,
      users,
      id,
    };
  });

  const handleClickPageButton = (page) => {
    changeParams({ page });
  };

  return (
    <Table
      columns={columns}
      dataSource={accountList}
      loading={loading}
      pagination={{
        pageSize: 15,
        style: { justifyContent: 'center' },
        showSizeChanger: false,
        current: Number(page),
        onChange: handleClickPageButton,
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(String(record.id));
          },
        };
      }}
    />
  );
}

export default AccountTable;

const NumberSpan = styled.span`
  color: ${({ status }) =>
    status === 'equal'
      ? color.black
      : status === 'over'
      ? color.red1
      : color.blue1};
`;
