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
    console.error('Error in getPosition',error);
    return null
  }
};

export const getProject = (object, key) => {
  try {
    if (key && has.call(object, 'project')) {
      if (has.call(object.project, key)) {
        return object.project[key];
      }
    }
    return null
  } catch (error) {
    console.error('Error in getProject',error);
    return null
  }
};
