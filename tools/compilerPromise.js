export const compilerPromise = compiler =>
  new Promise(resolve => {
    compiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return Promise.reject(new Error('Compiler promise error.'));
    });
  });

export default compilerPromise;
