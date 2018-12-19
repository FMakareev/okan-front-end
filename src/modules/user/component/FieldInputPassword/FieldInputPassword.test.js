import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import FieldInputPassword from './FieldInputPassword';

it('FieldInputPassword: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <FieldInputPassword name={'bu'} placeholder={'bu'} />
    </StyledThemeProvider>,
  );
});
