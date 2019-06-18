import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { variant } from 'styled-system';
import styled from 'styled-components';
import { asyncComponent } from 'react-async-component';

/** PropTypes */
import { fieldInputPropTypes } from '../../propTypes/Forms/FormPropTypes';

/** Css */
import '../../assets/style/react-datepicker-big.css';
import { Box } from '@lib/ui/Box/Box';
import { InputVariant } from '@lib/styles/variants/InputVariant';
import { InputSize } from '@lib/styles/variants/InputSize';

const inputSize = variant({
  key: 'variant.inputSize',
  prop: 'size',
});
const inputVariant = variant({
  key: 'variant.inputVariant',
  prop: 'variant',
});

const DatePicker = () =>
  asyncComponent({
    resolve: () =>
      import(/* webpackChunkName: 'chunk-name-react-datepicker'  */ 'react-datepicker'),
    ErrorComponent: ({ error }) => <div>{error.message}</div>,
    LoadingComponent: ({ variant, size }) => (
      <Box border={'1px solid #848484'} {...InputVariant[variant]} {...InputSize[size]}>
        Загрузка...
      </Box>
    ),
    serverMode: 'defer',
  });

export class DayPickerBase extends Component {
  static propTypes = {
    /**placeholder */
    placeholder: PropTypes.string,
    /**input */
    // ...fieldInputPropTypes,
  };

  static defaultProps = {
    input: { onChange: () => null, value: null },
    size: 'md',
    variant: 'default',
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.onChangeDatePicker = this.onChangeDatePicker.bind(this);

    /** @desc это костыль нужен для того чтобы асинхронная загрузка компонентов работала нормально, потому что при
     * наличии двух одинаковых компонентов появившихся на стриницы +- в одно время рендерился только первый компонент,
     * а второй зависал на загрузке и отвисал только после ручного перерендера.
     * Работает так, для каждого инстанса компонента DayPickerBase мы создаем свой инстанс с асинхронной загрузкой датапикера
     * благодаря этому для каждого инстанса DayPickerBase загрузка компонента происходит по отдельности
     * */
    this.DatePicker = DatePicker();
    this.DatePickerStyled = styled(this.DatePicker)`
      ${inputSize};
      ${inputVariant};
    `;
  }

  get initialState() {
    const { input } = this.props;

    return { startDate: input.value };
  }

  /**
   * @param {string} date
   * */
  onChangeDatePicker(date) {
    try {
      this.setState({ startDate: new Date(date) });
      const {
        input: { onChange },
      } = this.props;
      onChange(new Date(date));
    } catch (error) {
      console.error('Error onChangeDatePicker: ', error);
    }
  }

  render() {
    const { placeholder, input } = this.props;
    const { startDate } = this.state;

    return (
      <this.DatePickerStyled
        selected={startDate}
        onChange={this.onChangeDatePicker}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText={placeholder}
        dateFormat="dd / MM / yyyy"
        input={input}
        popperPlacement="top-end"
        popperModifiers={{ offset: { enabled: true, offset: '-130px, 0px' } }}
        {...this.props}
      />
    );
  }
}

export default DayPickerBase;
