/**
 * @param {object} store - redux store
 * @desc method return object user
 * */
export const getUserFromStore = store => {
  try {
    return store.user;
  } catch (e) {
    console.log(e);
    return null;
  }
};
