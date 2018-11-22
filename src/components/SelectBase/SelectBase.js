import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import SmallPreloader from '../SmallPreloader/SmallPreloader';
import { Relative } from "../Relative/Relative";
import { Absolute } from "../Absolute/Absolute";


/**
 * Компонент селекта (SelectBase)
 * @example ./SelectBase.example.md
 */

export class SelectBase extends Component {
  static propTypes = {
    /** input */
    input: PropTypes.object.isRequired,
    // label: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
    // type: PropTypes.string.isRequired,
    // mods: PropTypes.oneOfType([ PropTypes.object, PropTypes.bool ]),
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    // meta: PropTypes.object.isRequired
    labelKey: PropTypes.string,
    /**  value key input */
    valueKey: PropTypes.string,
    /** input value seelct */
    selectValue: PropTypes.string,
    /** loading */
    loading: PropTypes.bool,
    defaultOptions: PropTypes.object,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    mods: false,
    options: [],
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }
  shouldComponentUpdate(nextProps) {
    // console.log('shouldComponentUpdate nextProps', nextProps);
    // console.log('shouldComponentUpdate this.props', this.props);
    if (
      nextProps.input.value !== this.props.input.value ||
      nextProps.options.length !== this.props.options.length ||
      nextProps.loading !== this.props.loading
    ) {
      return true;
    }
    return false;
  }
  // componentDidMount() {
  //   const {
  //     input: { onChange },
  //     selectValue,
  //   } = this.props;
  //   if (selectValue) {
  //     onChange(selectValue);
  //   }
  // }

  onChange = event => {
    const { input, valueKey } = this.props;
    input.onChange(event ? event[valueKey] : null);
  };

  render() {
    const {
      input,
      options,
      disabled,
      labelKey,
      valueKey,
      selectValue,
      loading,
      defaultOptions,
      placeholder,
    } = this.props;
    return (
      <Relative>
        <Select
          defaultOptions={defaultOptions}
          selectValue={selectValue}
          name={input.name}
          value={input.value ? input.value : selectValue || ''}
          options={options}
          labelKey={labelKey}
          valueKey={valueKey}
          onChange={this.onChange}
          disabled={disabled}
          placeholder={placeholder}
        />
        {loading && (
          <Absolute right={0} top={0}>
            <SmallPreloader />
          </Absolute>
        )}
      </Relative>
    );
  }
}

export default SelectBase;
