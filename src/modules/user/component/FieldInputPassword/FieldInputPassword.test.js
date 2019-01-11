import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FieldInputPassword } from './FieldInputPassword';

describe('News container initial', () => {
  const props = {
    name: 'bu',
    placeholder: 'bu',
    isOpen: true,
    type: 'text',
  };

  const newsContainer = shallow(
    <StyledThemeProvider>
      <FieldInputPassword {...props} />
    </StyledThemeProvider>,
  ); // передали props

  it('renders properly', () => {
    expect(newsContainer).toMatchSnapshot();
  });
});
