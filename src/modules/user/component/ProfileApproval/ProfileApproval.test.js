import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ProfileApproval } from './ProfileApproval/ProfileApproval';

it('ProfileApproval: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProfileApproval />
    </StyledThemeProvider>,
  );
});
