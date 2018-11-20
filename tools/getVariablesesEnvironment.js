/* global process */
export const getVariablesesEnvironment = () => {
  console.info('run: Get Variableses Environment');
  return new Promise((resolve, reject) => {
    try {
      const env = {};

      process.argv.map(item => {
        if (item.indexOf('--') !== -1) {
          env[item.substring(2, item.indexOf('='))] = item.substring(item.indexOf('=') + 1);
          process.env[item.substring(2, item.indexOf('=')).toUpperCase()] = item.substring(
            item.indexOf('=') + 1,
          );
        }
        return null;
      });

      process.env.NODE_ENV = process.env.MODE || 'development';

      resolve(env);
    } catch (error) {
      console.error('ERROR:', error);
      reject(error);
    }
  });
};

export default getVariablesesEnvironment;
