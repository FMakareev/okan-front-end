export const isEmail = value => {
  const reg = new RegExp(/@okan\.ru$/gi);
  return reg.test(value) ? undefined : 'Некорректный email';
};

export default isEmail;
