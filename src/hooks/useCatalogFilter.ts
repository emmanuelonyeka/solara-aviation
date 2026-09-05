import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Keeps an index-page filter in the URL without filling browser history with
 * every tab press. A copied URL therefore reopens the same filtered view, and
 * an unknown value safely falls back to the complete index.
 */
export default function useCatalogFilter<T extends string>(
  options: readonly T[],
  parameter: string,
  fallback: T,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get(parameter);
  const value = options.find((option) => option === requested) ?? fallback;

  const setValue = useCallback(
    (nextValue: T) => {
      const nextParams = new URLSearchParams(searchParams);

      if (nextValue === fallback) nextParams.delete(parameter);
      else nextParams.set(parameter, nextValue);

      setSearchParams(nextParams, { replace: true });
    },
    [fallback, parameter, searchParams, setSearchParams],
  );

  return [value, setValue] as const;
}