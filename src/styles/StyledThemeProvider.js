import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'rebass';
import { ButtonVariant } from './variants/buttonVariant';
import { ButtonSize } from './variants/buttonSize';

export const ColorPallet = {
  color0: '#FFFFFF',
  color1: '#E5E5E5',
  color2: '#DEDEDE',
  color3: '#4F4F4F',
  color4: '#848484',
  color5: '#007FAF',
  color6: '#006699',
  color7: '#00649C',
  color8: '#007CC4',
  color9: '#F97E63',
};

const Space = [0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80];

const Weight = [300, 500, 700];

const Breakpoints = ['1024px', '1200px', '1440px'];

const boxShadow = [
  '2px 4px 8px 0px rgba(138,138,138,0.5)',
  '2px 4px 8px 0px rgba(138,138,138,0.5)',
];

export const StyledThemeProvider = ({ children }) => (
  <Provider
    theme={{
      space: Space,
      fontSizes: Space,
      fontWeight: Weight,
      lineHeight: Space,
      boxShadow,
      borderRadius: Space,
      borderColor: ColorPallet,
      breakpoints: Breakpoints,
      colors: ColorPallet,
      variant: { buttons: ButtonVariant },
      variants: { buttonSize: ButtonSize },
      fontFamily: { main: 'Museo Sans 300 Light', header: 'Circe Regular', headerBold: 'Circe Bold' },
    }}>
    {children}
  </Provider>
);

StyledThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

StyledThemeProvider.defaultProps = {
  children: 'children is empty',
};

export default StyledThemeProvider;
