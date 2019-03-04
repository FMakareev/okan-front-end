import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {variant} from 'styled-system';
import { ru } from 'date-fns/locale/ru';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import styled from 'styled-components';

/** PropTypes */
import { fieldInputPropTypes } from '../../propTypes/Forms/FormPropTypes';

/** Css */
import '../../assets/style/react-datepicker-big.css';

const DatePicker = dynamic(import('react-datepicker'), {
  ssr: false,
});

const inputSize = variant({
  key: 'variant.inputSize',
  prop: 'size',
});
const inputVariant = variant({
  key: 'variant.inputVariant',
  prop: 'variant',
});
const DatePickerStyled = styled(DatePicker)`
  ${inputSize};
  ${inputVariant};
`;


export class DayPickerBase extends Component {
  static propTypes = {
    /**placeholder */
    placeholder: PropTypes.string /**input */,
    ...fieldInputPropTypes,
  };

  static defaultProps = {
    input: { onChange: () => null, value: null },
    size: 'md',
    variant: 'default',
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  get initialState() {
    const { input } = this.props;

    return { startDate: input.value };
  }

  handleChange(date) {
    const brithDay = dayjs(date).format('DD / MM / YYYY');

    this.setState({ startDate: new Date(date).toISOString() });

    const {
      input: { onChange },
    } = this.props;

    onChange(new Date(date).toISOString());
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
        dateFormat="dd / MM / yyyy"
        input={input}
        locale={'ru'}
        popperPlacement="top-end"
        popperModifiers={{ offset: { enabled: true, offset: '-130px, 0px' } }}
        {...this.props}
      />
    );
  }
}

export default DayPickerBase;
