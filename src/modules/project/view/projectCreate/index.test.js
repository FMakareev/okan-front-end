import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ProviderRedux } from 'react-redux';

import { ProjectCreatePage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

const store = createStore(() => {});

it('ProjectCreatePage: рендер без ошибок', () => {
  const renderWithProps = props => {
    const defaultProps = {
      user: {
        id: '1111',
      },
    };

    return shallow(
      <StyledThemeProvider>
        <ProviderRedux store={store}>
          <BrowserRouter>
            <ProjectCreatePage {...defaultProps} />
          </BrowserRouter>
        </ProviderRedux>
      </StyledThemeProvider>,
    );
  };
  expect(renderWithProps()).toMatchSnapshot();
});
