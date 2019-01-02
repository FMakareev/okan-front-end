import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { PersonData } from './PersonData/PersonData';
import { BrowserRouter } from 'react-router-dom';

it('PersonData: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <PersonData />
    </StyledThemeProvider>,
  );
});
