import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { CheckboxBase } from './CheckboxBase';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { Input } from '../Input/Input';

import onCheckbox from '../../assets/image/onCheckbox.png';
import offCheckbox from '../../assets/image/offCheckbox.png';

test('Disabled checkbox', () => {
  const tree = renderer
    .create(
      <StyledThemeProvider>
        <CheckboxBase index={1} input={Input}>
          CheckboxBase
        </CheckboxBase>
      </StyledThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Enabled checkbox', () => {
  const tree = renderer
    .create(
      <StyledThemeProvider>
        <CheckboxBase checked index={1} input={Input}>
          CheckboxBase
        </CheckboxBase>
      </StyledThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
