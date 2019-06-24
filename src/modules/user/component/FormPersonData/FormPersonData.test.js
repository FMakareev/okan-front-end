import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ProviderRedux } from 'react-redux';
import { createStore } from 'redux';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormPersonData } from './FormPersonData';

const store = createStore(() => {});

it('FormPersonData: Рендерится без ошибок', () => {
  const renderWithProps = props => {
    const params = {
      initialValues: {
        lastname: 'one',
        firstname: 'two',
        patronymic: 'three',
        birthdate: '10.10.10',
        position: 'one',
        phone: '8-999-999-99-99',
        email: 'one',
      },
    };
    return renderer.create(
      <StyledThemeProvider>
        <ProviderRedux store={store}>
          <FormPersonData {...params} />
        </ProviderRedux>
      </StyledThemeProvider>,
    );
  };
  expect(renderWithProps({})).toMatchSnapshot();
});
