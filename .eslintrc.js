module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
  ],
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "prettier",
  ],
  "rules": {
    "prettier/prettier": "error",
    "import/no-extraneous-dependencies": [ "error",{"packageDir": './'} ],
    "react/jsx-filename-extension": [ 1,{"extensions": [ ".js",".jsx" ]} ],
    "jsx-a11y/anchor-is-valid": [ "error",{
      "components": [ "Link" ],
      "specialLink": [ "to" ],
      "aspects": [ "noHref","invalidHref","preferButton" ]
    } ],
    "class-methods-use-this": [ "error",{"exceptMethods": [ "initialState","render" ]} ],
    "no-console": [ "error",{allow: [ "warn","error","info","log" ]} ]
  },
  "env": {
    "browser": true,
    "node": true,
    "shared-node-browser": true,
    "es6": true,
  }
};
