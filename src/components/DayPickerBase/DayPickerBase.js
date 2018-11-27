import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';

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

export default class DayPickerBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null,
    };

    this.handleDayClick = this.handleDayClick.bind(this);
  }
  handleDayClick(day, { selected }) {
    console.log(1, day);

    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay: day });
  }
  render() {
    const { selectedDay } = this.state;
    console.log(2, this.state.selectedDay);
    return (
      <div>
        <DayPickerStyled onDayClick={this.handleDayClick} selectedDay={selectedDay} />
      </div>
    );
  }
}
