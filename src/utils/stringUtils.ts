/**
 * Capitalize each word
 *
 * @example capitalize("clark kent") // "Clark Kent"
 * @param {string} str
 * @returns {string}
 */
export const capitalize = str =>
  str
    .split(/\s/g)
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');

/**
 * Capitalize first character
 *
 * @example: capitalizeFirstChar("hello world!") // "Hello world!"
 * @param str
 * @returns {string}
 */
export const capitalizeFirstChar = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Format string to replace substring with a newValue:
 *
 * @example substringReplace("+1 416-321-1111") // "416-321-1111"
 * @example substringReplace("data:image/png;base64,iVBO...") // "iVBO..."
 * @param {string} str
 * @param {string} substring
 * @param {string} newValue
 * @returns {string}
 */
export const substringReplace = (str, substring, newValue) => {
  return str && str.includes(substring) ? str.replace(substring, newValue) : str;
};

/**
 * Replace camel cased string to normal string:
 *
 * @example decamelize('hourlyAuction') // 'hourly auction'
 * @example decamelize('runList') // 'run list'
 * @param str {string}
 * @returns {string}
 */
export const decamelize = str => {
  return str.replace(/[A-Z]/g, m => ` ${m.toLowerCase()}`);
};

/**
 * Nullify an empty string:
 *
 * @example nullifyEmptyString("") // null
 * @param {string} str
 * @returns {null|string}
 */
export const nullifyEmptyString = str => {
  if (str && str.length) {
    return str;
  }
  return null;
};

/**
 * Coverts an enum to a readable capitalized string:
 *
 * @example convertEnumToString('DELIVERED') // 'Delivered'
 * @example convertEnumToString('PENDING_PICKUP') // 'Pending Pickup'
 * @param {string} str
 * @returns {string}
 */
export const convertEnumToString = (str, capAll = true) => {
  if (!str) {
    return str;
  }
  const capFunc = capAll ? capitalize : capitalizeFirstChar;
  return capFunc(
    str
      .split('_')
      .join(' ')
      .toLowerCase()
  );
};

/**
 * Converts readable string to enum:
 *
 * @example convertStringToEnum("Pending Delivery") // "PENDING_DELIVERY"
 * @param {string} str
 * @returns {string}
 */
export const convertStringToEnum = str => {
  if (!str) {
    return str;
  }
  return str
    .split(' ')
    .join('_')
    .toUpperCase();
};

/**
 * Truncates a string to the max-length supplied, and adds an ellipsis if desired.
 *
 * @example truncate("testString", 3) // "tes..."
 * @param str {string}
 * @param maxLength {number}
 * @param hasEllipsis {boolean}
 * @returns {string|*}
 */
export const truncate = (str, maxLength = 25, hasEllipsis = true) => {
  if (str && str.length > maxLength) {
    return [str.substr(0, maxLength).trim(), hasEllipsis && '...'].join('');
  }
  return str;
};

/**
 * Formats booleans:
 *
 * @example formatBoolean(true) // "True"
 * @param boolean {boolean}
 * @returns {string}
 */
export const formatBoolean = boolean => {
  return capitalize(String(boolean));
};

/**
 * Joins together a potentially nested array of strings, numbers or any other values and filters out falsy values
 */
export const joinStrings = (strings: any[] = [], separator = ', '): string =>
  strings
    .flat()
    .filter(Boolean)
    .join(separator);

/**
 * Test url
 *
 * @param {string} text
 * @returns {boolean}
 */
export const isURL = text =>
  /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi.test(text);

/**
 * Test email
 *
 * @param {string} text
 * @returns {boolean}
 */
export const isEmail = text => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gi.test(text);

/**
 * Taken from https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
 *
 * @param {string} text
 * @returns {boolean}
 */
export const isPhoneNumber = text => /^\+?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/gi.test(text);
