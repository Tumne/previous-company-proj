import { useRef, useLayoutEffect } from 'react';

export const useCallbackWhenValueIsSet = (value: any, callback: () => void) => {
  const previousValueRef = useRef(value);
  useLayoutEffect(() => {
    if (previousValueRef.current === undefined && value !== undefined) {
      callback();
    }
    previousValueRef.current = value;
  }, [value, callback]);
};
