import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View */
import Text from '../../../../components/Text/Text';

/** Styles property */
import BackgroundColorProperty from '../../../../styles/styleProperty/BackgroundColorProperty';
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';

const TextStyled = styled(Text)`
  padding: 5px;
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color13' })};
`;

export class FormProfileNotification extends Component {
  static propTypes = {
    /** id user */
    // id:PropTypes.string,
    /** message user*/
    message: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data: {
        // id,
        message,
      },
    } = this.props;

    return (
      <Fragment>
        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={[4]}
          fontFamily={'primary500'}>
          Оповещения
        </Text>

        <TextStyled fontSize={6} lineHeight={8} color={'color11'} mb={[4]} fontFamily={'secondary'}>
          {message}
        </TextStyled>

        <TextStyled fontSize={6} lineHeight={8} color={'color11'} mb={[4]} fontFamily={'secondary'}>
          {message}
        </TextStyled>
      </Fragment>
    );
  }
}

export default FormProfileNotification;
