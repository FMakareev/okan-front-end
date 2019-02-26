export const compilerPromise = compiler =>
  new Promise(resolve => {
    compiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      console.log('stats.hasErrors(): ', stats.hasErrors());
      // return Promise.reject(new Error('Compiler promise error.'));
    });
  });

export default compilerPromise;
