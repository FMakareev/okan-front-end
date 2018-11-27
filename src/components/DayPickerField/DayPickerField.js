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
  padding: 10px;
  cursor: pointer;
`;

class DayPickerField extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { placeholder, selectedDay } = this.props;
    console.log(3, this.props.selectedDay);

    return (
      <ButtonBase onClick={this.handleClick} variant={'empty'} width={'100%'} p={0}>
        <FlexStyled justifyContent={'space-between'} width={'100%'}>
          <Text color={'#848484'} fontSize={5} lineHeight={6}>
            {selectedDay ? selectedDay.toLocaleDateString() : placeholder}
          </Text>

          {SvgCalendar()}
          {isOpen && (
            <Absolute zIndex={10} right={'10%'} top={'30%'}>
              <DayPickerBase selectedDay={selectedDay} />
            </Absolute>
          )}
        </FlexStyled>
      </ButtonBase>
    );
  }
}

export default DayPickerField;
