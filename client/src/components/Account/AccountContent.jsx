import React from 'react';
import { useAccountQuery } from '../../hooks';
import AccountTable from './AccountTable';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT_COUNT = 9999;

function AccountContent() {
  const { data: accounts } = useAccountQuery({
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_LIMIT_COUNT,
  });

  return (
    <div>
      <AccountTable accounts={accounts ? accounts : []} />
    </div>
  );
}

export default AccountContent;
