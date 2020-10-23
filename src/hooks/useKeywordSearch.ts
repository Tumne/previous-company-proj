import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';

/**
 * Keyword search hook
 * - debounces keyword search callback - based on timeout interval (defaults to 250)
 * - checks for empty `keyword` value and sets it to `undefined` to ensure it's removed from the params
 */
export const useKeywordSearch = (text: string, onChange: Function, timeout: number = 250) => {
  const onChangeParsed = keyword => onChange(keyword.trim() === '' ? undefined : keyword);
  const debouncedKeywords = useRef(debounce(onChangeParsed, timeout));
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    return debouncedKeywords.current(text);
  }, [text]);
};
