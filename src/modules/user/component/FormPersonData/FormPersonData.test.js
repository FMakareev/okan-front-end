import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormPersonData } from './FormPersonData';

it('FormPersonData: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <FormPersonData />
    </StyledThemeProvider>,
  );
});
