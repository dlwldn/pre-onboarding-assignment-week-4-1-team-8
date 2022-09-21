import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLoginQuery } from '../../hooks';
import { ACCOUNT_PAGE_PATHNAME } from '../../lib/consts/pagePath';
import color from '../../styles/color';
import storage from '../../lib/util/storage';
import storageKey from '../../lib/consts/storageKey';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { isFetching } = useLoginQuery(
    { email: formData.email, password: formData.password },
    {
      enabled: formData.email !== '' && formData.password !== '',
      onSuccess: (data) => {
        storage.set(storageKey.TOKEN, data.accessToken);
        navigate(ACCOUNT_PAGE_PATHNAME);
      },
      onError: () => {
        message.error('로그인에 실패하였습니다.');
      },
    }
  );

  useEffect(() => {
    storage.get(storageKey.TOKEN) && navigate(ACCOUNT_PAGE_PATHNAME);
  }, []);

  const handleSubmitForm = (values) => {
    setFormData(values);
  };

  return (
    <FormWrapper>
      <Form onFinish={handleSubmitForm}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: '이메일을 입력해주세요',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <SubmitButton type="primary" htmlType="submit" loading={isFetching}>
            로그인
          </SubmitButton>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}

export default LoginForm;

const FormWrapper = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  box-shadow: 0px 0px 10px ${color.gray1};
`;
const SubmitButton = styled(Button)`
  width: 100%;
`;
