import { useState } from 'react';

const useService = (serviceFn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [response, setResponse] = useState(null);

  const fetchData = async (params) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await serviceFn(params);
      const json = await res.json();
      setResponse(json);
    } catch (e) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [response, fetchData, isLoading, hasError];
};

export default useService;
