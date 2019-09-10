import React from 'react';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';
import { RevisionListPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

test('RevisionListPage: рендер без ошибок', () => {
  const renderWithProps = props => {
    const defaultProps = {
      match: {
        params: { token: 'randomToken' },
      },
    };

    return renderer.create(
      <StyledThemeProvider>
        <BrowserRouter>
          <RevisionListPage {...defaultProps} />
        </BrowserRouter>
      </StyledThemeProvider>,
    );
  };
  expect(renderWithProps({})).toMatchSnapshot();
});
