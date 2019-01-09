import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ProfileCreateUser } from './ProfileCreateUser/ProfileCreateUser';

it('ProfileCreateUser: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProfileCreateUser />
    </StyledThemeProvider>,
  );
});
