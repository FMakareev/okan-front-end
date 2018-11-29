import React, { Component } from 'react';
import styled from 'styled-components';
import { Absolute } from 'rebass';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

// import DayPickerBase from '../DayPickerBase/DayPickerBase';
import ButtonBase from '../ButtonBase/ButtonBase';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import { SvgCalendar } from '../Icons/SvgCalendar';

import Go from '../../assets/icons/monocolor/go.monocolor.svg';
import Back from '../../assets/icons/monocolor/back.monocolor.svg';

const DayPickerStyled = styled(DayPicker)`
  cursor: pointer;

  .DayPicker-Caption {
    color: #fff;
    background: #007faf;
    border: 1px solid #007faf;
    height: 50px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    margin: 0;
    padding: 10px 0 0 10px;
  }

  .DayPicker-Month {
    border: 1px solid grey;
    background-color: #fff;
  }

  .DayPicker-NavButton--prev,
  .DayPicker-NavButton--next {
    background-image: url;
  }
`;

const FlexStyled = styled(Flex)`
  border: 2px solid #848484;
  padding: 10px;
  cursor: pointer;
`;

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

class DayPickerField extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, month: fromMonth };

    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleYearMonthChange(month) {
    this.setState({ month });
  }

  render() {
    const { isOpen, month } = this.state;
    const {
      placeholder,
      // input: { value },
      input: { onChange },
    } = this.props;

    return (
      <ButtonBase onClick={this.handleClick} variant={'empty'} width={'100%'} p={0}>
        <FlexStyled justifyContent={'space-between'} width={'100%'}>
          <Text color={'#848484'} fontSize={5} lineHeight={6}>
            {this.state.selectedDay ? this.state.selectedDay.toLocaleDateString() : placeholder}
          </Text>

          {SvgCalendar()}
          {isOpen && (
            <Absolute zIndex={10} right={'10%'} top={'30%'}>
              <DayPickerStyled
                month={month}
                fromMonth={fromMonth}
                toMonth={toMonth}
                captionElement={({ date, localeUtils }) => (
                  <YearMonthForm
                    date={date}
                    localeUtils={localeUtils}
                    onChange={this.handleYearMonthChange}
                  />
                )}
              />
            </Absolute>
          )}
        </FlexStyled>
      </ButtonBase>
    );
  }
}

export default DayPickerField;
