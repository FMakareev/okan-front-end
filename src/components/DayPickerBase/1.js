import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale/ru';

/** PropTypes */
import { fieldInputPropTypes } from '../../propTypes/Forms/FormPropTypes';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';

const DatePickerStyled = styled(DatePicker)`
  font-size: 16px !important;
  line-height: 20px !important;
  border: 0 !important;
  padding: 10px !important;
  width: 100% !important;
  ${props => FontFamilyProperty({ ...props, fontFamily: 'secondary' })};
  ${props => color({ ...props, color: 'color11' })};

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100% !important;
  }

  & .react-datepicker__header {
    background-color: #007faf !important;
  }
`;

export class DayPickerBase extends Component {
  static propTypes = {
    /**placeholder */
    placeholder: PropTypes.string,
    /**input */
    ...fieldInputPropTypes,
  };

  constructor(props) {
    super(props);
    this.state = { startDate: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({ startDate: date });

    // const {
    //   input: { onChange },
    // } = this.props;
    // const dateString = date && date.format('YYYY.MM.DD');
    // console.log(dateString);
    // onChange(dateString);
  }

  render() {
    const { placeholder, input } = this.props;
    const { startDate } = this.state;

    return (
      <DatePickerStyled
        selected={startDate}
        onChange={this.handleChange}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        locale={'ru'}
        input={input}
      />
    );
  }
}

export default DayPickerBase;
