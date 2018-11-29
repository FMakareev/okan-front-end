import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ChangePassword } from './ChangePassword/ChangePassword';
import { PersonData } from './PersonData/PersonData';

it('ChangePassword: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ChangePassword />
    </StyledThemeProvider>,
  );
});

it('PersonData: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <PersonData />
    </StyledThemeProvider>,
  );
});
