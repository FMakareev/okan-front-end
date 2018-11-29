import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ProfileApproval } from './ProfileApproval/ProfileApproval';
// import { ProfileCreateUser } from './ProfileCreateUser/ProfileCreateUser';
import { ProfileNotification } from './ProfileNotification/ProfileNotification';
import { ProfileRecoveryEmail } from './ProfileRecoveryEmail/ProfileRecoveryEmail';

it('ProfileApproval: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProfileApproval />
    </StyledThemeProvider>,
  );
});

// it('ProfileCreateUser: Рендерится без ошибок', () => {
//   renderer.create(
//     <StyledThemeProvider>
//       <ProfileCreateUser />
//     </StyledThemeProvider>,
//   );
// });

it('ProfileNotification: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProfileNotification />
    </StyledThemeProvider>,
  );
});

// it('ProfileRecoveryEmail: Рендерится без ошибок', () => {
//   renderer.create(
//     <StyledThemeProvider>
//       <ProfileRecoveryEmail />
//     </StyledThemeProvider>,
//   );
// });
