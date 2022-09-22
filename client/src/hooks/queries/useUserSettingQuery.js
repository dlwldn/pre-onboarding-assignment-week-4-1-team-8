import { useQuery } from 'react-query';
import { queryKey } from '../../lib';
import { getUserSetting } from '../../lib/api/user';
import useErrorApi from './useErrorApi';

function useUserSettingQuery({ page, limit }, option) {
  const { handleErrorAuth } = useErrorApi();
  return useQuery(
    [queryKey.USER_SETTING, page, limit],
    () => getUserSetting({ page, limit }),
    {
      onError: (error) => {
        handleErrorAuth(error);
      },
      ...option,
    }
  );
}

export default useUserSettingQuery;
