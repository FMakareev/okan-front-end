import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormButton } from './FormButton';

it('FormButton: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <FormButton />
    </StyledThemeProvider>,
  );
});

it('FormButton: Рендерится без ошибок с свойствами', () => {
  renderer.create(
    <StyledThemeProvider>
      <FormButton children={'button'} disabled={false} />
    </StyledThemeProvider>,
  );
});
