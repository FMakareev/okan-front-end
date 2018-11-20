/* eslint radix: ["error", "as-needed"] */

// example maxValue(message)(max)(value)
export const maxValue = message => max => value =>
  value && parseInt(value) <= max ? undefined : `message:${message} ${max}`;
export default maxValue;
