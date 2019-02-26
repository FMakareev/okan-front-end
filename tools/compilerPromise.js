export const compilerPromise = compiler =>
  new Promise(resolve => {
    compiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      console.log('stats.errors: ', stats.errors);
      console.log('stats.compilation: ', stats.compilation);
      console.log('stats.compilation.errors: ', stats.compilation.errors);
      // return Promise.reject(new Error('Compiler promise error.'));
    });
  });

export default compilerPromise;
