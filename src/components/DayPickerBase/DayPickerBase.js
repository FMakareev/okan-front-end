import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

/** PropTypes */
import { fieldInputPropTypes } from '../../propTypes/Forms/FormPropTypes';

const DatePickerStyled = styled(DatePicker)`
  font-size: 16px !important;
  line-height: 20px !important;
  border: 0 !important;
  padding: 10px !important;
  width: 100% !important;
  font-family: ${props => props.theme.fontFamily.secondary} !important;

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
    return (
      <DatePickerStyled
        selected={this.state.startDate}
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
