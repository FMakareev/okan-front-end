import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ProfileRecoveryEmail } from './ProfileRecoveryEmail/ProfileRecoveryEmail';

it('ProfileRecoveryEmail: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProfileRecoveryEmail />
    </StyledThemeProvider>,
  );
});
