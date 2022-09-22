import { useQuery } from 'react-query';
import { queryKey } from '../../lib';
import { getUserDetail } from '../../lib/api/user';
import useErrorApi from './useErrorApi';

function useUserDetailQuery({ id }, option) {
  const { handleErrorAuth } = useErrorApi();
  return useQuery([queryKey.USER_DETAIL, id], () => getUserDetail({ id }), {
    onError: (error) => {
      handleErrorAuth(error);
    },
    ...option,
  });
}

export default useUserDetailQuery;
