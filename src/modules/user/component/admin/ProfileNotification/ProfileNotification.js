import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View */
import Text from '../../../../../components/Text/Text';

/** Styles property */
import BackgroundColorProperty from '../../../../../styles/styleProperty/BackgroundColorProperty';

const TextStyled = styled(Text)`
  ${props => BackgroundColorProperty({ ...props, borderColor: 'color0' })};
  border: 1px solid #848484;
  border-radius: 5px;
  padding: 5px;
`;

export class ProfileNotification extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={4} fontFamily={'primary500'}>
          Оповещения
        </Text>

        <TextStyled fz={5} lh={7} color={'color11'} mb={4} fontFamily={'secondary'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim
        </TextStyled>

        <TextStyled fz={5} lh={7} color={'color11'} mb={4} fontFamily={'secondary'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim
        </TextStyled>
      </Fragment>
    );
  }
}

export default ProfileNotification;
