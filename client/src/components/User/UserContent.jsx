import React from 'react';
import {
  useAccountQuery,
  useUserQuery,
  useUserSettingQuery,
} from '../../hooks';
import { DEFAULT_PAGE_LIMIT_COUNT, DEFAULT_PAGE_NUMBER } from '../../lib';
import UserTable from './UserTable';

function UserContent() {
  const { data: accounts } = useAccountQuery({
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_LIMIT_COUNT,
  });
  const { data: userSettings } = useUserSettingQuery(
    {
      page: DEFAULT_PAGE_NUMBER,
      limit: DEFAULT_PAGE_LIMIT_COUNT,
    },
    {
      enabled: Boolean(accounts),
    }
  );
  const { data: users = [], isFetching } = useUserQuery(
    {
      page: DEFAULT_PAGE_NUMBER,
      limit: DEFAULT_PAGE_LIMIT_COUNT,
    },
    {
      enabled: Boolean(userSettings),
    }
  );

  return (
    <div>
      <UserTable
        users={users}
        accounts={accounts ? accounts : []}
        userSettings={userSettings ? userSettings : []}
        loading={isFetching}
      />
    </div>
  );
}

export default UserContent;
