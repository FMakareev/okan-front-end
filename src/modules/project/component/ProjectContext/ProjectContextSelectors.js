const has = Object.prototype.hasOwnProperty;

export const getPosition = (object, key) => {
  try {
    if (key && has.call(object, 'position')) {
      if (has.call(object.position, key)) {
        return object.position[key];
      }
    }
    return null
  } catch (error) {
    console.error(error);
    return null
  }
};
