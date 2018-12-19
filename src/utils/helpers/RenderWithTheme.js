import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';

export const RenderWithTheme = component =>
  renderer.create(<StyledThemeProvider>{component}</StyledThemeProvider>);

export default RenderWithTheme;
