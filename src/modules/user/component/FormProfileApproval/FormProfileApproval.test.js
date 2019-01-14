import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormProfileApproval } from './FormProfileApproval';

describe('News container initial', () => {
  const props = {
    data: {
      name: '1',
      number: '2',
    },
  };

  const newsContainer = shallow(
    <StyledThemeProvider>
      <FormProfileApproval {...props} />
    </StyledThemeProvider>,
  ); // передали props

  it('renders properly', () => {
    expect(newsContainer).toMatchSnapshot();
  });
});
