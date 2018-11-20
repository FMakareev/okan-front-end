const getProps = config => {
  const props = [];
  if (config.ref) props.push('svgRef');
  if (config.titleProp) props.push('title');
  if (config.expandProps) props.push('...props');

  if (props.length === 0) return '()';
  if (props.length === 1 && config.expandProps) return 'props';

  return `({ ${props.join(', ')} })`;
};

const reactDomTemplate = (code, config, state) => {
  const props = getProps(config);

  console.log(1, code);

  let result = `import React from 'react'\n\n`;
  if (config.replaceAttrValues.fill) {
    result += `const ${state.componentName} = ${props} => ${code.replace(
      /#(?:[0-9a-fA-F]{3}){1,2}/,
      'inherit',
    )}\n\n`;
  } else {
    result += `const ${state.componentName} = ${props} => ${code}\n\n`;
  }

  if (state.webpack && state.webpack.previousExport) {
    result += `export default ${state.webpack.previousExport}\n`;
    result += `export { ${state.componentName} as ReactComponent }`;
  } else if (state.rollup && state.rollup.previousExport) {
    result += `${state.rollup.previousExport}\n`;
    result += `export { ${state.componentName} as ReactComponent }`;
  } else {
    result += `export default ${state.componentName}`;
  }

  return result;
};

export const svgrLoaderConfig = [
  {
    test: /url\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  },
  {
    test: /multicolor\.svg$/,
    loader: ['@svgr/webpack'],
  },
  {
    test: /monocolor\.svg$/,
    loader: '@svgr/webpack',
    options: {
      icon: true,
      expandProps: true,
      replaceAttrValues: {
        fill: 'inherit',
      },
      template: reactDomTemplate,
    },
  },
];

export default svgrLoaderConfig;
