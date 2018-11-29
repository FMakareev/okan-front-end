import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ProjectList } from './ProjectList';

it('ProjectList: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProjectList />
    </StyledThemeProvider>,
  );
});

// it('ProjectList: Рендерится без ошибок', () => {
//   renderer.create(
//     <StyledThemeProvider>
//       <ProjectList />
//     </StyledThemeProvider>,
//   );
// });
