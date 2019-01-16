/* global process */
import fs from 'fs';
import findIndex from 'lodash/findIndex';

const has = Object.prototype.hasOwnProperty;


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
  const modulesList = {
    // client: [],
    // server: [],
  };
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(src, (err, data) => {
        if (err) {
          console.log(err);
        }
        data.forEach(moduleName => {
          if (fs.statSync(src + moduleName).isDirectory()) {
            const dirContent = fs.readdirSync(src + moduleName);

            if (dirContent.filter(dirItem => dirItem === 'index.server.js').length) {
              modulesList[moduleName] = {
                ...modulesList[moduleName],
                name: moduleName,
                server: 'index.server.js'
              };
            }

            if (dirContent.filter(dirItem => dirItem === 'index.client.js').length) {
              modulesList[moduleName] = {
                ...modulesList[moduleName],
                name: moduleName,
                client: 'index.client.js'
              };
            } else if (dirContent.filter(dirItem => dirItem === 'index.js').length) {
              modulesList[moduleName] = {
                ...modulesList[moduleName],
                name: moduleName,
                client: 'index.js'
              };
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
 * @param {object} modulesList - объект с данными о экспортах модуля, ключами объекта являются названия модулей
 * @param {string} src - путь к целевой дирректории
 * @desc создание списка дирректорий которые имеют свой index.js */
const createIndex = async (modulesList, src) => {
  let indexClientJS = '';
  let indexServerJS = '';

  Object.entries(modulesList).forEach(([key, value]) => {
    if (has.call(value, 'server')) {
      indexServerJS += `export {default as ${value.name}} from './${value.name}/${value.server}';`;
    }
    if (has.call(value, 'client')) {
      indexClientJS += `export {default as ${value.name}} from './${value.name}/${value.client}';`;
    }

  });


  if (indexClientJS) fs.appendFileSync(`${src}index.client.js`, indexClientJS);
  if (indexServerJS) fs.appendFileSync(`${src}index.server.js`, indexServerJS);
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
          if (findIndex(Object.entries(modulesList), ([module]) => module === excludeModules[i]) !== -1) {
            console.log('excludeModules[i]: ', excludeModules[i]);
            delete modulesList[excludeModules[i]];
          } else {
            console.warn(`WARNING: module with name '${excludeModules[i]}' does not exist.`);
          }
        }

        break;
      }
      case 'include': {
        console.log('include');
        const includeModules = value.split(',');
        let newModulesList = {};
        for (let i = 0; i < includeModules.length; i += 1) {
          if (findIndex(Object.entries(modulesList), ([module]) => module === includeModules[i]) !== -1) {
            newModulesList = {
              ...newModulesList,
              [includeModules[i]]: modulesList[includeModules[i]]
            };
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
  console.log('modulesList: ', modulesList);
  await createIndex(modulesList, src);
};

init();

export default init;
