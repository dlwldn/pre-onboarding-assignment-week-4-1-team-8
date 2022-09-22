import { useQuery } from 'react-query';
import { queryKey } from '../../lib';
import { getAccount } from '../../lib/api/account';
import useErrorApi from './useErrorApi';

function useAccountQuery({ page, limit, keyword }, option) {
  const { handleErrorAuth } = useErrorApi();
  return useQuery(
    [queryKey.ACCOUNT, page, limit],
    () => getAccount({ page, limit, keyword }),
    {
      onError: (error) => {
        handleErrorAuth(error);
      },
      ...option,
    }
  );
}

export default useAccountQuery;
