import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { Absolute, Relative } from 'rebass';
import DeepEqual from 'fast-deep-equal';
import { color } from 'styled-system';

/** View */
import SmallPreloader from '../SmallPreloader/SmallPreloader';

/** Styles */
import { FontFamilyProperty } from '../../styles/styleProperty/FontFamilyProperty';

/** Image */
import back from '../../assets/image/back.png';
import go from '../../assets/image/go.png';

const SelectStyled = styled(Select)`
  .css-15k3avv {
    border-bottom: '1px solid';
    position: static;
    padding: 0;
    margin: 0;
    border-top-left-radius: 0px;
    border-top-left-radius: 0px;
    font-size: 18px;
    line-height: 24px;
    ${props => FontFamilyProperty({ ...props, fontFamily: 'primary500' })};
    ${props => color({ ...props, color: 'color11' })};
  }

  .css-vj8t7z {
    border: 0;
  }

  .css-1wy0on6 {
    width: 30px;
    height: 30px;
  }

  .css-1ep9fjw {
    background-image: url(${go});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    padding: 10px;
  }

  .css-1uq0kb5 {
    background-image: url(${back});
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  .css-19bqh2r,
  .css-d8oujb {
    display: none;
  }

  .css-1492t68 {
    ${props => FontFamilyProperty({ ...props, fontFamily: 'secondary' })}
    line-height: 24px;
    font-size: 18px;
    left: 35%;
  }

  .css-xp4uvy {
    text-align: center;
    left: 35%;
    ${props => color({ ...props, color: 'color11' })};
    font-size: 18px;
    line-height: 24px;
  }

  .css-v73v8k,
  .css-wqgs6e,
  .css-z5z6cw {
    border-bottom: 1px solid #00649c;
    width: 95%;
    margin: 0 auto;
    text-align: center;

    :last-child {
      border-bottom: 0;
    }
  }

  .css-z5z6cw {
    ${props => color({ ...props, color: 'color11' })};
    background-color: #fff;
  }

  .css-11unzgr {
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .css-z5z6cw: active {
    background-color: #deebff;
  }

  .css-z5z6cw {
    :hover {
      background-color: #deebff;
    }
  }
`;

/**
 * Компонент селекта (SelectBase)
 * @example ./SelectBase.example.md
 */

export class SelectBase extends Component {
  static propTypes = {
    /** input */
    input: PropTypes.object.isRequired, // mods: PropTypes.oneOfType([ PropTypes.object, PropTypes.bool ]), // type: PropTypes.string.isRequired, // label: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    labelKey: PropTypes.string /**  value key input */,
    valueKey: PropTypes.string /** input value seelct */,
    selectValue: PropTypes.string /** loading */,
    loading: PropTypes.bool,
    defaultOptions: PropTypes.object,
    placeholder: PropTypes.string,
  }; // meta: PropTypes.object.isRequired

  static defaultProps = { mods: false, options: [], placeholder: '' }; // valueKey: 'id', // labelKey: 'name',

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  //перестраиваются элементы в вирт.доме
  shouldComponentUpdate(nextProps, nextState) {
    const {
      input: { value },
      isLoading,
      options,
    } = this.props;
    const { selectedOption } = this.state;

    if (
      nextProps.input.value !== this.props.value ||
      nextProps.placeholder !== this.props.placeholder ||
      !DeepEqual(nextProps.options, options) ||
      nextProps.isLoading !== isLoading ||
      selectedOption !== nextState.selectedOption
    ) {
      return true;
    }
    return false;
  }

  //Когда будет изменено вирт. дом (устаревший)
  componentWillReceiveProps = nextProps => {
    const {
      input: { value },
      valueKey,
      options,
    } = nextProps;

    if (
      nextProps.input.value !== this.props.input.value ||
      !DeepEqual(nextProps.options, this.props.options)
    ) {
      this.setState({
        selectedOption: this.getSelectedValueFromOptions(options, value, valueKey),
      });
    }
  };

  // Доступ к предыдущим пропсам
  componentDidUpdate(prevProps) {
    const {
      // then options is update - we must update selectedOption at state
      input: { value },
      valueKey,
      options,
    } = this.props;
    if (!DeepEqual(prevProps.options, options)) {
      this.setState({
        selectedOption: this.getSelectedValueFromOptions(options, value, valueKey),
      });
    }
  }

  get initialState() {
    const {
      input: { value },
      valueKey,
      options,
    } = this.props;

    if (value) {
      return { selectedOption: this.getSelectedValueFromOptions(options, value, valueKey) };
    }
    return { selectedOption: null };
  }

  getSelectedValueFromOptions = (options, value, valueKey) => {
    let selectedOption = {};
    if (options) {
      options.forEach(item => {
        if (item[valueKey] === value) {
          selectedOption = item;
        }
      });
    }
    if (!Object.keys(selectedOption).length) {
      // if we return empty object (it means no selected value), placeholders not working
      selectedOption = null;
    }
    return selectedOption;
  };

  onChange = selectedOption => {
    const { input, valueKey } = this.props;
    this.setState(
      () => ({ selectedOption }),
      () => {
        input.onChange(this.state.selectedOption ? this.state.selectedOption[valueKey] : null);
      },
    );
  };

  render() {
    const { input, options, disabled, labelKey, valueKey, placeholder, isLoading } = this.props;
    const { selectedOption } = this.state;

    return (
      <Relative>
        <SelectStyled
          value={selectedOption}
          name={input.name}
          options={options}
          isLoading={isLoading}
          getOptionValue={
            option => option[valueKey] // getOptionLabel={option => option[labelKey]}
          }
          onChange={this.onChange}
          disabled={disabled}
          placeholder={options[0].value}
          blurInputOnSelect={true}
          labelKey={labelKey}
          valueKey={valueKey}
        />
      </Relative>
    );
  }
}

export default SelectBase;
