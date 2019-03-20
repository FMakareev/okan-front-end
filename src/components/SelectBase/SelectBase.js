import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import DeepEqual from 'fast-deep-equal';

/** Component */
import { SvgTriangle } from '@lib/ui/Icons/SvgTriangle';
import { Text } from '@lib/ui/Text/Text';
import { InputVariant } from '../../styles/variants/InputVariant';
import has from '../../utils/has';

/**
 * @param {object} theme - объект варианта из темы, импортируем напрямую из папки styles/variant
 * @param {string} themeKey - Название варианта который хотим использовать
 * @param {string} component - название компонета react-select который хотим стилизовать
 * @return {object} возвращает объект с css стилями
 * */
const getStyleVariant = (theme, themeKey, component) => {
  try {
    if (has.call(theme, themeKey)) {
      if (has.call(theme[themeKey], 'rs') && has.call(theme[themeKey]['rs'], component)) {
        return theme[themeKey]['rs'][component];
      }
    }
    return {};
  } catch (e) {
    console.error('Error getStyleVariant: ', e);
    return {};
  }
};

export const SelectStyles = {
  control: (style, props) => {
    return {
      ...style,
      padding: '0 0 0 10px',
      border: '1px solid #848484',
      minHeight: '30px',
      ...getStyleVariant(InputVariant, props.selectProps.variant, 'control'),
      ':hover': {
        // border: "none",
        // boxShadow: "none"
      },
      ...(props.isFocused
        ? {
            // border: "none",
            // boxShadow: "none"
          }
        : {}),
      ...(props.menuIsOpen
        ? {
            borderRadius: '5px 5px 0 0',
            borderBottom: 'none',
          }
        : {}),
    };
  },
  selectContainer: (style, props) => {
    return {
      ...style,
      padding: 0,
      ...getStyleVariant(InputVariant, props.selectProps.variant, 'selectContainer'),
    };
  },
  valueContainer: (style, props) => {
    return {
      ...style,
      padding: 0,
      ...getStyleVariant(InputVariant, props.selectProps.variant, 'valueContainer'),
    };
  },
  dropdownIndicator: (style, props) => {
    return {
      ...style,
      padding: '0 10px',
      ...getStyleVariant(InputVariant, props.selectProps.variant, 'dropdownIndicator'),
    };
  },
  menu: (style, props) => {
    return {
      ...style,
      margin: 0,
      border: '1px solid #848484',
      borderRadius: '0 0 5px 5px',
      ...getStyleVariant(InputVariant, props.selectProps.variant, 'menu'),
    };
  },
  option: (style, props) => {
    return {
      ...style,
      width: 'calc(100% - 20px)',
      margin: '0 10px',
      borderBottom: '1px solid #00649C',
      textAlign: 'center',
      ...(props.isSelected
        ? {
            backgroundColor: 'rgba(0,127,175,.2)',
            color: '#333333',
          }
        : null),
      ...getStyleVariant(InputVariant, props.selectProps.variant, 'option'),
    };
  },
  indicatorSeparator: (style, props) => {
    return {
      ...style,
      display: 'none',
      ...getStyleVariant(InputVariant, props.selectProps.variant, 'indicatorSeparator'),
    };
  },
  singleValue: (style, props) => {
    return {
      ...style,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '-webkit-transform': 'translate(-50%, -50%)',
      '-ms-transform': 'translate(-50%, -50%)',
      ...getStyleVariant(InputVariant, props.selectProps.variant, 'singleValue'),
    };
  },
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <Text
        style={{
          transform: props.isFocused ? 'rotate(90deg)' : 'rotate(0)',
        }}
        fill={'#333333'}>
        <SvgTriangle />
      </Text>
    </components.DropdownIndicator>
  );
};

/**
 * Компонент селекта (SelectBase)
 * @example ./SelectBase.example.md
 */

export class SelectBase extends Component {
  static propTypes = {
    /** input */
    input: PropTypes.object.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    labelKey: PropTypes.string /**  value key input */,
    valueKey: PropTypes.string /** input value seelct */,
    selectValue: PropTypes.string /** loading */,
    loading: PropTypes.bool,
    defaultOptions: PropTypes.object,
    placeholder: PropTypes.string,
    optionsFilter: PropTypes.func,
  };

  static defaultProps = {
    mods: false,
    options: [],
    placeholder: '',
    optionsFilter: options => options,
  }; // valueKey: 'id', // labelKey: 'name',

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
    const {
      input,
      options,
      components,
      disabled,
      labelKey,
      valueKey,
      placeholder,
      isLoading,
      optionsFilter,
      ...rest
    } = this.props;
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        name={input.name}
        options={optionsFilter(options)}
        isLoading={isLoading}
        onChange={this.onChange}
        disabled={disabled}
        placeholder={placeholder}
        blurInputOnSelect={true}
        getOptionLabel={option => option[labelKey]}
        getOptionValue={option => option[valueKey]}
        styles={SelectStyles}
        components={{ DropdownIndicator, ...components }}
        {...rest}
      />
    );
  }
}

export default SelectBase;
