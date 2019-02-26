export const compilerPromise = compiler =>
  new Promise(resolve => {
    compiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      // console.log('stats.errors: ', stats.errors);
      // console.log('stats.compilation.error: ', stats.compilation.error);
      // console.log('stats.compilation.errors: ', stats.compilation.errors);
      if(Array.isArray(stats.compilation.errors)){
        stats.compilation.errors.forEach(item=>{
          console.error(item);
        })
      }
      // return Promise.reject(new Error('Compiler promise error.'));
    });
  });

export default compilerPromise;
