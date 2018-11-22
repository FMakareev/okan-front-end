import fs from 'fs-extra';

export const assetsMove = () => {
  try {
    fs.copySync('./src/assets/fonts', './public/assets/fonts');
    fs.copySync('./src/assets/icons', './public/assets/icons');
    fs.copySync('./src/assets/image', './public/assets/image');
    fs.copySync('./src/assets/style', './public/assets/style');

    console.log('success!');
  } catch (err) {
    console.error(err);
  }
};

export default assetsMove;
