import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Text from '../../../../../components/Text/Text';

const TextStyled = styled(Text)`
  background-color: #f2f2f2;
  border: 1px solid #848484;
  border-radius: 5px;
  padding: 5px;
`;

export class ProfileNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={4}>
          Оповещения
        </Text>

        <TextStyled fz={5} lh={7} color={'color10'} mb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim
        </TextStyled>

        <TextStyled fz={5} lh={7} color={'color10'} mb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim
        </TextStyled>
      </Fragment>
    );
  }
}

export default ProfileNotification;
