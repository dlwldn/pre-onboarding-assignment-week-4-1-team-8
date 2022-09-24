import { Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCustomRouter } from '../../hooks';
import { getChangedDate, getChangedMaskingPhoneNumber } from '../../lib';
import { searchUser } from '../../lib/api/user';
import styled from 'styled-components';
import color from '../../styles/color';

const columns = [
  {
    title: '고객명',
    dataIndex: 'userName',
    render: (text, record) => <Link to={`/user/${record.key}`}>{text}</Link>,
  },
  {
    title: '보유중인 계좌수',
    dataIndex: 'accountCount',
  },
  {
    title: '이메일',
    dataIndex: 'email',
  },
  {
    title: '주민등록상 성별코드',
    dataIndex: 'genderOrigin',
  },
  {
    title: '생년월일',
    dataIndex: 'birthDate',
    render: (text) => getChangedDate(text),
  },
  {
    title: '휴대폰 번호',
    dataIndex: 'phoneNumber',
    render: (text) => getChangedMaskingPhoneNumber(text),
  },
  {
    title: '최근 로그인',
    dataIndex: 'lastLogin',
    render: (text) =>
      getChangedDate(text, '-', { isNeedTime: true, timeDelimeter: ':' }),
  },
  {
    title: '혜택 수신 동의 여부',
    dataIndex: 'allowMarketingPush',
    render: (text) => (text ? 'O' : 'X'),
  },
  {
    title: '임직원 계좌 여부',
    dataIndex: 'isStaff',
    render: (text) => (text ? 'O' : 'X'),
    filters: [
      {
        text: 'O',
        value: true,
      },
      {
        text: 'X',
        value: false,
      },
    ],
    onFilter: (value, record) => {
      return value === record.isStaff;
    },
  },
  {
    title: '활성화 여부',
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
    title: '가입일',
    dataIndex: 'createdAt',
    render: (text) => getChangedDate(text),
  },
];

function UserTable({ users, accounts, userSettings, loading }) {
  const {
    changeParams,
    currentParams: { page },
  } = useCustomRouter();

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const inputRef = useRef();

  const userList = users.map((user) => {
    const {
      birth_date,
      created_at,
      email,
      gender_origin,
      id,
      name,
      phone_number,
      last_login,
      uuid,
    } = user;
    return {
      key: id,
      userName: name,
      accountCount: accounts.filter((account) => account.user_id === id).length,
      allowMarketingPush: userSettings.find((setting) => setting.uuid === uuid)
        ?.allow_marketing_push,
      isActive: userSettings.find((setting) => setting.uuid === uuid)
        ?.is_active,
      isStaff: userSettings.find((setting) => setting.uuid === uuid)?.is_staff,
      email: email,
      genderOrigin: gender_origin,
      birthDate: birth_date,
      createdAt: created_at,
      phoneNumber: phone_number,
      lastLogin: last_login,
    };
  });

  const handleClickPageButton = (page) => {
    changeParams({ page });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputRef.current.value === '') return;

    const fetch = async () => {
      const result = await searchUser(inputRef.current.value);
      const newUserList = result.map((user) => {
        const {
          birth_date,
          created_at,
          email,
          gender_origin,
          id,
          name,
          phone_number,
          last_login,
          uuid,
        } = user;
        return {
          key: id,
          userName: name,
          accountCount: accounts.filter((account) => account.user_id === id)
            .length,
          allowMarketingPush: userSettings.find(
            (setting) => setting.uuid === uuid
          )?.allow_marketing_push,
          isActive: userSettings.find((setting) => setting.uuid === uuid)
            ?.is_active,
          isStaff: userSettings.find((setting) => setting.uuid === uuid)
            ?.is_staff,
          email: email,
          genderOrigin: gender_origin,
          birthDate: birth_date,
          createdAt: created_at,
          phoneNumber: phone_number,
          lastLogin: last_login,
        };
      });

      setSearchedUsers(newUserList);
    };

    fetch();
    setIsSearched(true);
  };

  return (
    <>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Input ref={inputRef} />
        <Button type="submit">검색</Button>
      </Form>
      {isSearched ? (
        <Table columns={columns} dataSource={searchedUsers} loading={loading} />
      ) : (
        <Table
          columns={columns}
          dataSource={userList}
          loading={loading}
          pagination={{
            pageSize: 15,
            style: { justifyContent: 'center' },
            showSizeChanger: false,
            current: Number(page),
            onChange: handleClickPageButton,
          }}
        />
      )}
    </>
  );
}

export default UserTable;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  all: unset;
  height: 24px;
  background-color: ${color.white};
  border: 1px solid ${color.gray3};
  margin: 4px;
  border-radius: 4px;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${color.white};
  border: 1px solid ${color.black};
  border-radius: 4px;
  height: 24px;
  line-height: 24px;
  width: 36px;
  text-align: center;
`;
