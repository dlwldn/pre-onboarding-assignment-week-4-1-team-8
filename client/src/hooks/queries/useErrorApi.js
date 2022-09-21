import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PAGE_PATHNAME } from '../../lib/consts/pagePath';
import storageKey from '../../lib/consts/storageKey';
import storage from '../../lib/util/storage';

const AUTH_ERROR_STATUS_CODE = 401;

function useErrorApi() {
  const navigate = useNavigate();

  const handleErrorAuth = (error) => {
    if (error.response.status === AUTH_ERROR_STATUS_CODE) {
      message.error('다시 로그인 해주세요.');
      storage.remove(storageKey.TOKEN);
      navigate(LOGIN_PAGE_PATHNAME);
    }
  };

  return {
    handleErrorAuth,
  };
}

export default useErrorApi;
