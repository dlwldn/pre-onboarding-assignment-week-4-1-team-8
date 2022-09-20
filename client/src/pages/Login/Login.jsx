import React from 'react';
import styled from 'styled-components';
import { LoginForm } from '../../components';

function Login() {
  return (
    <LoginWrapper>
      <LoginForm />
    </LoginWrapper>
  );
}

export default Login;

const LoginWrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
