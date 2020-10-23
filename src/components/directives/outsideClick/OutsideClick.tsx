import React, { useEffect } from 'react';

/**
 * Component enhancer that provides click outside detection, and ESC key to trigger click.
 * Directional keys optional.
 */
const OutsideClick: React.FC<{
  onClick: Function;
  directionalKeys?: Array<any>;
  ignoredElements?: Array<any>;
  stopPropagation?: Boolean;
  children: React.ReactElement;
}> = ({ onClick, directionalKeys, ignoredElements = [], stopPropagation, children }): React.PropsWithChildren<any> => {
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  let wrapped: HTMLElement;

  const handleKeyDown = e => {
    const esc = 27; // ESC
    const directions = [37, 38, 39, 40]; // left, up, right, down

    if (e.keyCode === esc || (directionalKeys && directions.includes(e.keyCode))) {
      onClick();
    }
  };

  const handleClickOutside = event => {
    const isIgnoredItem = ignoredElements.find(e => e && e.contains(event.target));
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (wrapped && !wrapped.contains(event.target) && !isIgnoredItem) {
      onClick();
    }
  };
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: element => {
        wrapped = element;
      },
    });
  }
  return children;
};

export default OutsideClick;
