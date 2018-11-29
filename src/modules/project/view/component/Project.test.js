import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ProjectList } from './ProjectList/ProjectList';
import { RevisionList } from './RevisionList/RevisionList';

it('ProjectList: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <ProjectList />
    </StyledThemeProvider>,
  );
});

it('RevisionList: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <RevisionList />
    </StyledThemeProvider>,
  );
});
