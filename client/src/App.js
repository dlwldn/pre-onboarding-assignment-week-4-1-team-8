import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components';
import {
  ACCOUNT_DETAIL_PAGE_PATHNAME,
  ACCOUNT_PAGE_PATHNAME,
  HOME_PAGE_PATHNAME,
  LOGIN_PAGE_PATHNAME,
  USER_PAGE_PATHNAME,
  USER_DETAIL_PAGE_PATHNAME
} from './lib/consts/pagePath';
import { Account, AccountDetail, Home, Login, User, UserDetail } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PAGE_PATHNAME} element={<Home />} />
        <Route path={LOGIN_PAGE_PATHNAME} element={<Login />} />
        <Route element={<PageLayout />}>
          <Route path={ACCOUNT_PAGE_PATHNAME} element={<Account />} />
          <Route
            path={ACCOUNT_DETAIL_PAGE_PATHNAME}
            element={<AccountDetail />}
          />
          <Route path={USER_PAGE_PATHNAME} element={<User />} />
          <Route path={USER_DETAIL_PAGE_PATHNAME} element={<UserDetail />} />
        </Route>
        <Route path="/*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
