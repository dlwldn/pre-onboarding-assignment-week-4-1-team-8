import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE_PATHNAME } from '../lib/consts/pagePath';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(LOGIN_PAGE_PATHNAME);
  }, []);

  return <div></div>;
}

export default Home;
