import chalk from 'chalk';

export const logMessage = (message, level = 'info') => {
  if (level === 'error') {
    console.error(`[${new Date().toISOString()}]`, chalk.red(message));
  } else if (level === 'warning') {
    console.warn(`[${new Date().toISOString()}]`, chalk.yellow(message));
  } else {
    console.log(`[${new Date().toISOString()}]`, chalk.white(message));
  }
};

export default logMessage;
