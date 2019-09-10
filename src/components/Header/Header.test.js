import React from 'react';
import { shallow } from 'enzyme';

import { BrowserRouter } from 'react-router-dom';

import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import Header from './Header';

test('Header: Рендерится без ошибок', () => {
  const renderWithProps = props => {
    return shallow(
      <StyledThemeProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </StyledThemeProvider>,
    );
  };

  expect(renderWithProps()).toMatchSnapshot();
});
