import { useQuery } from 'react-query';
import { login, queryKey } from '../../lib';

function useLoginQuery({ email, password }, option) {
  return useQuery(
    [queryKey.LOGIN, email, password],
    () => login({ email, password }),
    option
  );
}

export default useLoginQuery;
