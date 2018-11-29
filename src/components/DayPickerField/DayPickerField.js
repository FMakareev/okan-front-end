import React, { Component } from 'react';
import styled from 'styled-components';
import { Absolute } from 'rebass';

import DayPickerBase from '../DayPickerBase/DayPickerBase';
import ButtonBase from '../ButtonBase/ButtonBase';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import { SvgCalendar } from '../Icons/SvgCalendar';

const FlexStyled = styled(Flex)`
  border: 2px solid #848484;
  cursor: pointer;
  position: relative;
`;

class DayPickerField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      placeholder,
      input: { onChange },
      input,
    } = this.props;

    console.log(2, this.props);

    return (
      <FlexStyled justifyContent={'space-between'} width={'100%'}>
        <Text color={'#848484'} fontSize={5} lineHeight={6} width={'100%'}>
          <DayPickerBase placeholder={placeholder} input={input} />
        </Text>
        <Absolute zIndex={10} right={'7%'} top={'24%'}>
          {SvgCalendar()}
        </Absolute>
      </FlexStyled>
    );
  }
}

export default DayPickerField;
