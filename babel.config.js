const config = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "fileName": false,
        "displayName": false,
        "ssr": true,
        "pure": true,
        "minify": true
      }
    ],
    "@babel/plugin-proposal-class-properties",

    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
};

if (process.env.NODE_ENV === 'test') {
  config.plugins.push("require-context-hook")
}
module.exports = config;
