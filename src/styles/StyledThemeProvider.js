import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'rebass';
import { ButtonVariant } from './variants/buttonVariant';
import { ButtonSize } from './variants/buttonSize';

export const ColorPallet = {
  color0: '#FFFFFF',
  color1: '#848484',
  color2: '#006699',
  color3: '#007FC1',
  color4: '#007FAF',
  color5: '#D9D9D9',
};

const Space = [0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80];

const Breakpoints = ['576px', '768px', '1024px'];

const boxShadow = [
  '2px 4px 8px 0px rgba(138,138,138,0.5)',
  '2px 4px 8px 0px rgba(138,138,138,0.5)',
];

export const StyledThemeProvider = ({ children }) => (
  <Provider
    theme={{
      baseFontSize: 20,
      space: Space,
      fontSizes: Space,
      lineHeight: Space,
      boxShadow,
      borderRadius: Space,
      borderColor: ColorPallet,
      breakpoints: Breakpoints,
      colors: ColorPallet,
      variant: { buttons: ButtonVariant },
      variants: { buttonSize: ButtonSize },
      fontFamily: { regular: 'Roboto-Regular', bold: 'Roboto-Bold', medium: 'Roboto-Medium' },
    }}>
    {children}
  </Provider>
);

StyledThemeProvider.prototype = {
  children: PropTypes.element.isRequired,
};

StyledThemeProvider.defaultProps = {
  children: 'children is empty',
};

export default StyledThemeProvider;
