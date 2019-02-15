export const deleteQueryFromCache = (data, value) => {
  try {
    Object.keys(data).forEach(function (key) {
      if (key.indexOf(value) >= 0) {
        delete data[key];
      }
    });
    return data;
  } catch (error) {
    console.log(error);
    return data;
  }
};

export default deleteQueryFromCache;
