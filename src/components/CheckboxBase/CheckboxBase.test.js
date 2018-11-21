import React from 'react';
import 'jest-styled-components';
import CheckboxBase from './CheckboxBase';
import RenderWithTheme from '../../utils/helpers/RenderWithTheme';

test('Disabled checkbox', () => {
  const tree = RenderWithTheme(<CheckboxBase index={1}>CheckboxBase</CheckboxBase>).toJSON();
  expect(tree).toMatchSnapshot();
});
test('Enabled checkbox', () => {
  const tree = RenderWithTheme(
    <CheckboxBase checked index={1}>
      CheckboxBase
    </CheckboxBase>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
