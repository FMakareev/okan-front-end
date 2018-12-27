const path = require('path');
/** @desc этот конфиг нужен для того чтобы webstorm правильно резолвил пути по указаным маскам */
module.exports = {
  resolve: {
    modules: ['node_modules'],
    /** @link https://webpack.js.org/configuration/resolve/#resolve-alias */
    alias: {
      /** маска пути для глобальных компонентов проекта */
      '@lib/ui': path.resolve('src/components/'),
      /** маска пути для стилей проекта */
      '@lib/styles': path.resolve('src/styles/'),
      /** маска пути для утилит проекта проекта */
      '@lib/utils': path.resolve('src/utils/'),
      '@lib/shared': path.resolve('src/shared/'),
    },
  },
}
