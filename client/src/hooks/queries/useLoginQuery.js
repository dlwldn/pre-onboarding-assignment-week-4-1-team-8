import { useQuery } from 'react-query';
import { login, queryKey } from '../../lib';

function useLoginQuery({ email, password }, option) {
  return useQuery([queryKey, email, password], () =>
    login({ email, password })
  );
}

export default useLoginQuery;
