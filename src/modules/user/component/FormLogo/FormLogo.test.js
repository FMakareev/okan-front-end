import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormLogo } from './FormLogo';

it('FormLogo: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <FormLogo />
    </StyledThemeProvider>,
  );
});
