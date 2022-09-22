import { useQuery } from 'react-query';
import { getUsers } from '../../lib/api/user';
import { queryKey } from '../../lib/consts';
import useErrorApi from './useErrorApi';

function useUserQuery({ page, limit, keyword }, option) {
  const { handleErrorAuth } = useErrorApi();
  return useQuery(
    [queryKey.USER, page, limit, keyword],
    () => getUsers({ page, limit, keyword }),
    {
      onError: (error) => {
        handleErrorAuth(error);
      },
      ...option,
    }
  );
}

export default useUserQuery;
