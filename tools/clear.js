const del = require('del');

export const Clear = async () => {
  console.info('run: Clear');
  const remove = [
    './src/modules/index.js',
    './src/store/localization/localization.json',
    './src/store/localization/messages',
    './public',
  ];

  return new Promise((resolve, reject) => {
    del(remove)
      .then(paths => {
        console.info('Deleted files and folders:\n', paths.join('\n'));
        resolve(paths);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export default Clear;
