import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  AccountBookOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  ACCOUNT_PAGE_PATHNAME,
  LOGIN_PAGE_PATHNAME,
  USER_PAGE_PATHNAME,
} from '../../lib/consts/pagePath';
import storage from '../../lib/util/storage';
import storageKey from '../../lib/consts/storageKey';
import color from '../../styles/color';

const { Header, Footer, Sider, Content } = Layout;
const MENU_KEYS = ['1', '2', '3'];
const MENU_LABELS = ['계좌목록', '유저목록', '로그아웃'];
const MENU_LIST = [
  {
    key: MENU_KEYS[0],
    icon: <AccountBookOutlined />,
    label: MENU_LABELS[0],
  },
  {
    key: MENU_KEYS[1],
    icon: <UserOutlined />,
    label: MENU_LABELS[1],
  },
  {
    key: MENU_KEYS[2],
    icon: <LogoutOutlined />,
    label: MENU_LABELS[2],
  },
];

function PageLayout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentPath, setCurrentPath] = useState(MENU_KEYS[0]);
  const [headerTitle, setHeaderTitle] = useState(MENU_LABELS[0]);

  useEffect(() => {
    if (pathname.split('/')[1] === ACCOUNT_PAGE_PATHNAME.split('/')[1]) {
      setCurrentPath(MENU_KEYS[0]);
      setHeaderTitle(MENU_LABELS[0]);
      return;
    }
    if (pathname.split('/')[1] === USER_PAGE_PATHNAME.split('/')[1]) {
      setCurrentPath(MENU_KEYS[1]);
      setHeaderTitle(MENU_LABELS[1]);
      return;
    }
  }, [pathname]);

  const handleClickMenuItem = (menu) => {
    switch (menu.key) {
      case MENU_KEYS[0]:
        navigate(ACCOUNT_PAGE_PATHNAME);
        setHeaderTitle(MENU_LABELS[0]);
        break;
      case MENU_KEYS[1]:
        navigate(USER_PAGE_PATHNAME);
        setHeaderTitle(MENU_LABELS[1]);
        break;
      case MENU_KEYS[2]:
        storage.remove(storageKey.TOKEN);
        navigate(LOGIN_PAGE_PATHNAME);
        break;
      default:
        navigate(ACCOUNT_PAGE_PATHNAME);
        setHeaderTitle(MENU_LABELS[0]);
    }
  };

  return (
    <LayoutWrapper>
      <Sider trigger={null} collapsible collapsed={false}>
        <Logo>D. PREFACE</Logo>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={currentPath}
          onClick={handleClickMenuItem}
          items={MENU_LIST}
        />
      </Sider>
      <Layout>
        <HeaderWrapper>
          <span>#{headerTitle}</span>
          <div>유저로고</div>
        </HeaderWrapper>
        <ContentWrapper>{children || <Outlet />}</ContentWrapper>
        <FooterWrapper>Copyright © December and Company Inc.</FooterWrapper>
      </Layout>
    </LayoutWrapper>
  );
}

export default PageLayout;

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;
`;
const HeaderWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  color: ${color.white};
`;
const ContentWrapper = styled(Content)`
  padding: 10px;
`
const FooterWrapper = styled(Footer)`
  text-align: center;
`;
const Logo = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: ${color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  :hover {
    cursor: default;
  }
`;
