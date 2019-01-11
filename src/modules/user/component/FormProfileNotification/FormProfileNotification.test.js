import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { FormProfileNotification } from './FormProfileNotification/';

describe('News container initial', () => {
  const props = {
    data: {
      message: '1',
    },
  };

  const newsContainer = shallow(
    <StyledThemeProvider>
      <FormProfileNotification {...props} />
    </StyledThemeProvider>,
  ); // передали props

  it('renders properly', () => {
    expect(newsContainer).toMatchSnapshot();
  });
});
