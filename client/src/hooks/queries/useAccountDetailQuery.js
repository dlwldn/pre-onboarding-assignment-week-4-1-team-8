import { useQuery } from 'react-query';
import { queryKey } from '../../lib';
import { getAccountDetail } from '../../lib/api/account';
import useErrorApi from './useErrorApi';

function useAccountDetailQuery({ id }, option) {
  const { handleErrorAuth } = useErrorApi();
  return useQuery(
    [queryKey.ACCOUNT_DETAIL, id],
    () => getAccountDetail({ id }),
    {
      onError: (error) => {
        handleErrorAuth(error);
      },
      ...option,
    }
  );
}

export default useAccountDetailQuery;
