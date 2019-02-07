import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';
import '../../assets/style/react-datepicker-big.css';
import { ru } from 'date-fns/locale/ru';
import dynamic from 'next/dynamic';

const DatePicker = dynamic(import('react-datepicker'), {
  ssr: false,
});

/** PropTypes */
import { fieldInputPropTypes } from '../../propTypes/Forms/FormPropTypes';
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';

export class DayPickerBase extends Component {
  static propTypes = {
    /**placeholder */
    placeholder: PropTypes.string /**input */,
    ...fieldInputPropTypes,
  };

  static defaultProps = { input: { onChange: () => null, value: null } };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  get initialState() {
    return { startDate: null };
  }

  handleChange(date) {
    this.setState({ startDate: date });

    const {
      input: { onChange },
    } = this.props;

    onChange(date.toString());
  }

  // componentDidUpdate = nextProps => {
  //   if (nextProps.input.value !== this.props.input.value) {
  //     this.setState({ startDate: null });
  //   }
  // };

  render() {
    const { placeholder, input } = this.props;
    const { startDate } = this.state;

    return (
      <DatePicker
        selected={startDate}
        onChange={this.handleChange}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        input={input}
        locale={'ru'}
        popperPlacement="top-end"
        popperModifiers={{ offset: { enabled: true, offset: '-130px, 0px' } }}
        {...this.props}
      />
    );
    // isClearable={true}
  }
}

export default DayPickerBase;
