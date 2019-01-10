/* global process */
import fs from 'fs';
import findIndex from 'lodash/findIndex';

const getCliParams = () => {
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
  return env;
};

/**
 * @param {string} src - путь к целевой дирректории
 * @desc создание списка (массива 3-ех массивов) дирректорий которые имеют свой index.js и/или index.client.js и index.server.js */
const getModulesList = src => {
  const modulesList = [[], [], []];
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(src, (err, data) => {
        if (err) {
          console.log(err);
        }
        data.forEach(moduleName => {
          if (fs.statSync(src + moduleName).isDirectory()) {
            const dirContent = fs.readdirSync(src + moduleName);
            if (dirContent.filter(dirItem => dirItem === 'index.js').length) {
              modulesList[0].push(moduleName);
            } else if (dirContent.filter(dirItem => dirItem === 'index.client.js').length) {
              modulesList[1].push(moduleName);
            } else if (dirContent.filter(dirItem => dirItem === 'index.server.js').length) {
              modulesList[2].push(moduleName);
            } else {
              console.warn(`WARNING!: folder ${moduleName} is empty.`);
            }
          } else if (moduleName === 'index.client.js' || 'index.server.js') {
            fs.unlinkSync(src + moduleName);
          }
        });
        resolve(modulesList);
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

/**
 * @param {array} modulesList - массив массивов с названиями модулей [[имеющий index.js],[имеющий index.client.js],[имеющий index.server.js]]
 * @param {string} src - путь к целевой дирректории
 * @desc создание списка дирректорий которые имеют свой index.js */
const createIndex = async (modulesList, src) => {
  let indexClientJS = '';
  let indexServerJS = '';
  console.log('createIndex', modulesList, src);
  modulesList[0].map(module => {
    indexClientJS += `export {default as ${module}} from './${module}';`;
    return null;
  });
  modulesList[1].map(module => {
    indexClientJS += `export {default as ${module}} from './${module}/index.client';`;
    return null;
  });
  modulesList[2].map(module => {
    indexServerJS += `export {default as ${module}} from './${module}/index.server'`;
    return null;
  });
  console.log(indexClientJS);
  console.log(indexServerJS);
  fs.appendFileSync(`${src}index.client.js`, indexClientJS);
  fs.appendFileSync(`${src}index.server.js`, indexServerJS);
};

/** @desc */
export const init = async () => {
  console.info('run createIndex');
  const env = getCliParams();

  /** @desc путь к целевой дирректории */
  const src = `${process.cwd()}/src/modules/`;
  console.log(src);
  let modulesList = await getModulesList(src);

  Object.entries(env).forEach(([key, value]) => {
    switch (key) {
      case 'exclude': {
        console.log('exclude');
        const excludeModules = value.split(',');
        for (let i = 0; i < excludeModules.length; i += 1) {
          if (findIndex(modulesList, module => module === excludeModules[i]) !== -1) {
            modulesList.splice(findIndex(modulesList, module => module === excludeModules[i]), 1);
          } else {
            console.warn(`WARNING: module with name '${excludeModules[i]}' does not exist.`);
          }
        }

        break;
      }
      case 'include': {
        console.log('include');
        const includeModules = value.split(',');
        let newModulesList = [];
        for (let i = 0; i < includeModules.length; i += 1) {
          if (findIndex(modulesList, module => module === includeModules[i]) !== -1) {
            newModulesList = [
              ...newModulesList,
              ...modulesList.splice(
                findIndex(modulesList, module => module === includeModules[i]),
                1,
              ),
            ];
          } else {
            console.warn(`WARNING: module with name '${includeModules[i]}' does not exist.`);
          }
        }
        modulesList = newModulesList;
        break;
      }
      default: {
        break;
      }
    }
  });

  await createIndex(modulesList, src);
};

init();

export default init;
