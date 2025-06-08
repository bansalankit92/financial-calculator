import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useQueryParams() {
  const searchParams = useSearchParams();
  
  const getQueryParam = useCallback((key: string, defaultValue: string | number): number => {
    const value = searchParams.get(key);
    if (!value) return Number(defaultValue);
    return Number(value);
  }, [searchParams]);

  const createQueryString = useCallback(
    (params: { [key: string]: string | number }) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        newSearchParams.set(key, String(value));
      });
      return newSearchParams.toString();
    },
    [searchParams]
  );

  return {
    getQueryParam,
    createQueryString,
  };
} 