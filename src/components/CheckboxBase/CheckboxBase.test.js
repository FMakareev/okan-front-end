import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { CheckboxBase } from './CheckboxBase';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';

test('Disabled checkbox', () => {
  const tree = renderer
    .create(
      <StyledThemeProvider>
        <CheckboxBase index={1}>CheckboxBase</CheckboxBase>
      </StyledThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Enabled checkbox', () => {
  const tree = renderer
    .create(
      <StyledThemeProvider>
        <CheckboxBase checked index={1}>
          CheckboxBase
        </CheckboxBase>
      </StyledThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
