export const isEmail = value => {
  const reg = new RegExp(/@okan\.su$/gi);
  return reg.test(value) ? undefined : 'Некорректный email : test@okan.su';
};

export default isEmail;
