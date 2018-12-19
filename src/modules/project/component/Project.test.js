import React from 'react';
import renderer from 'react-test-renderer';
import { ProjectList } from './ProjectList/ProjectList';
import { RevisionList } from './RevisionList/RevisionList';
import { StyledThemeProvider } from '../../../styles/StyledThemeProvider';

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
