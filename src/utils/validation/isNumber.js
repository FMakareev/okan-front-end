/* global isNaN */
export const isNumber = value =>
  value && Number.isNaN(Number(value)) ? 'Must be a number' : undefined;
export default isNumber;
