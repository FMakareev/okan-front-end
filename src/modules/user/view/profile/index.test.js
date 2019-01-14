import React from 'react';
import renderer from 'react-test-renderer';
import { Provider as ProviderRedux } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ProfilePage } from './index';
import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { Store } from '../../../../store';

test('ProfilePage: рендер без ошибок', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <BrowserRouter>
        <ProviderRedux store={Store}>
          <ProfilePage />
        </ProviderRedux>
      </BrowserRouter>
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
