import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ProfileNotification } from './ProfileNotification/ProfileNotification';

it('ProfileNotification: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProfileNotification />
    </StyledThemeProvider>,
  );
});
