import React from 'react';
import renderer from 'react-test-renderer';
import { Provider as ProviderRedux } from 'react-redux';
import { createStore } from 'redux';

import { BrowserRouter } from 'react-router-dom';
import { DocumentSettingsPage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';

const store = createStore(() => {});

test('DocumentSettingsPage: рендер без ошибок', () => {
  const renderWithProps = props => {
    const defaultProps = {
      match: {
        params: { key: '3c64e11c68c5159fb2a87b89ed719ae900e90ff77e2e0b19426b950b4fe8ff33' },
      },
    };

    return renderer.create(
      <StyledThemeProvider>
        <ProviderRedux store={store}>
          <BrowserRouter>
            <DocumentSettingsPage {...defaultProps} />
          </BrowserRouter>
        </ProviderRedux>
      </StyledThemeProvider>,
    );
  };
  expect(renderWithProps({})).toMatchSnapshot();
});
