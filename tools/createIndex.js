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
 * @desc создание списка дирректорий которые имеют свой index.js */
const getModulesList = src => {
  const modulesList = [];

  try {
    const data = fs.readdirSync(src);
    data.forEach(moduleName => {
      if (fs.statSync(src + moduleName).isDirectory()) {
        const dirContent = fs.readdirSync(src + moduleName);
        if (dirContent.filter(dirItem => dirItem === 'index.js').length) {
          modulesList.push(moduleName);
        } else {
          console.warn(`WARNING!: folder ${moduleName} is empty.`);
        }
      } else if (moduleName === 'index.js') {
        fs.unlinkSync(src + moduleName);
      }
    });

    return modulesList;
  } catch (err) {
    console.log(err);
    return [];
  }

};

/**
 * @param {array} modulesList - массив с названиями модулей
 * @param {string} src - путь к целевой дирректории
 * @desc создание списка дирректорий которые имеют свой index.js */
const createIndex = (modulesList, src) => {
  let indexJS = '';
  console.log('createIndex', modulesList, src);
  modulesList.map(module => {
    indexJS += `export {default as ${module}} from './${module}';`;
    return null;
  });
  console.log(indexJS);
  fs.appendFileSync(`${src}index.js`, indexJS);
};

/** @desc */
export const init = () => {
  console.info('run createIndex');
  const env = getCliParams();

  /** @desc путь к целевой дирректории */
  const src = `${process.cwd()}/src/modules/`;
  console.log(src);
  let modulesList = getModulesList(src);

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

  createIndex(modulesList, src);
};

export default init;
