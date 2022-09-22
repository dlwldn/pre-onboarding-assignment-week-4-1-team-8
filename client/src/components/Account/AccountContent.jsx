import React from 'react';
import { useAccountQuery, useUserQuery } from '../../hooks';
import { DEFAULT_PAGE_LIMIT_COUNT, DEFAULT_PAGE_NUMBER } from '../../lib';
import AccountTable from './AccountTable';


function AccountContent() {
  const { data: users } = useUserQuery({
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_LIMIT_COUNT,
  });
  const { data: accounts, isFetching } = useAccountQuery(
    {
      page: DEFAULT_PAGE_NUMBER,
      limit: DEFAULT_PAGE_LIMIT_COUNT,
    },
    {
      enabled: Boolean(users),
    }
  );

  return (
    <div>
      <AccountTable
        accounts={accounts ? accounts : []}
        users={users ? users : []}
        loading={isFetching}
      />
    </div>
  );
}

export default AccountContent;
