import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { StyledThemeProvider } from '../../../../styles/StyledThemeProvider';
import { ProfileApproval } from './ProfileApproval';

describe('ProfileApproval', () => {
  const props = {
    data: {
      name: '1',
      number: '2',
    },
  };

  const newsContainer = shallow(
    <StyledThemeProvider>
      <ProfileApproval {...props} />
    </StyledThemeProvider>,
  ); // передали props

  it('renders properly', () => {
    expect(newsContainer).toMatchSnapshot();
  });
});
