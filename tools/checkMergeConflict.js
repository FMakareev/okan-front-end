/* global process */
import fs from 'fs';
import git from 'simple-git';
import chalk from 'chalk';

const simpleGit = git(process.cwd());

simpleGit.diff(['HEAD', '--name-only', '--diff-filter=M'], (err, data) => {
  if (err) {
    console.error(err);
    process.abort();
    return;
  }
  // process.exit(1);
  try {
    console.info(chalk.greenBright('Scanning...Conflict Files List:'));
    const filePathList = data.split('\n').filter(file => file.indexOf('.') !== 0 && file !== '');

    const errorList = filePathList.filter(item => {
      const fileString = fs.readFileSync(`${process.cwd()}/${item}`);
      if (fileString.indexOf('<<<<<<< HEAD') !== -1) {
        return true;
      }
      return false;
    });

    if (errorList.length) {
      errorList.forEach(item => {
        console.error(
          chalk.red(`${process.cwd()}/${item} - files conflict, need to solve them first!!`),
        );
      });
      process.abort();
    } else {
      console.info(chalk.greenBright('No Conflicts, Start to commit!'));
    }
  } catch (error) {
    console.error(error);
    process.abort();
  }
});
