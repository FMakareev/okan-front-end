// example minValue(message)(min)(value)
export const minValue = message => min => value =>
  value && value <= min ? `${message} ${min}` : undefined;
export default minValue;
