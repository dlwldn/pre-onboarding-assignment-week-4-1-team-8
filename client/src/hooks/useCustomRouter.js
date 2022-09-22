import { createSearchParams, useSearchParams } from 'react-router-dom';

function useCustomRouter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams);

  const changeParams = (params) => {
    const changedParams = createSearchParams({
      ...currentParams,
      ...params,
    });
    setSearchParams(changedParams);
  };

  return {
    changeParams,
    currentParams,
  };
}

export default useCustomRouter;
