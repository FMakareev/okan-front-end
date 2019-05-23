import React, { Component } from 'react';
import styled from 'styled-components';
import { Box } from 'grid-styled';
import { components } from 'react-select';

/** Image */

import { SvgAdd } from '../Icons/SvgAdd';
import { SvgDelete } from '../Icons/SvgDelete';

/** view */
import ButtonBase from '../ButtonBase/ButtonBase';
import Text from '../Text/Text';
import Flex from '../Flex/Flex';
import { SelectBase, SelectStyles } from '@lib/ui/SelectBase/SelectBase';
import DeepEqual from 'fast-deep-equal';

const FlexStyled = styled(Flex)`
  border-top: 1px solid #00649c;
  border-radius: 0px;
`;

const NewSelectStyles = {
  ...SelectStyles,
  control: (style, props) => {
    return {
      ...style,
      width: '100%',
      padding: '0 0 0 10px',
      border: 'none',
      borderRadius: 0,
      cursor: 'pointer',
      ':hover': {
        border: 'none',
        boxShadow: 'none',
      },
      ...(props.isFocused
        ? {
            border: 'none',
            boxShadow: 'none',
          }
        : {}),
      ...(props.menuIsOpen
        ? {
            borderRadius: '0',
            border: 'none',
          }
        : {}),
    };
  },
  menu: style => {
    return {
      ...style,
      margin: 0,
      borderRadius: '5px',
    };
  },
};

const ControlComponent = props => (
  <FlexStyled py={2} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
    <SvgAdd />
    <components.Control {...props} />
  </FlexStyled>
);

/**
 * Компонент инпута c доабвлением еще инпутов (Text Field Array)
 * @example ./TextFieldArray.example.md
 */
export class TextFieldArray extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    if (this.props.input.value.length) {
      const { options, valueKey, input } = this.props;

      return {
        selectedOption:
          options &&
          options.filter(optionItem =>
            input.value.find(valueItem => valueItem === optionItem[valueKey]),
          ),
      };
    }
    return { selectedOption: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (
      !DeepEqual(nextProps.options, this.props.options) ||
      !DeepEqual(nextProps.input.value, this.props.input.value)
    ) {
      const { options, valueKey, input } = nextProps;
      if (input.value && options) {
        this.setState(() => ({
          selectedOption:
            options &&
            options.filter(optionItem =>
              input.value.find(valueItem => valueItem === optionItem[valueKey]),
            ),
        }));
      }
    }
  }

  onDelete = value => {
    try {
      const { input } = this.props;
      input.onChange(this.compareOptions(input.value, [value]));
    } catch (error) {
      console.error('Error onDelete: ', error);
    }
  };

  onChange = value => {
    const { input, valueKey } = this.props;
    input.onChange([...input.value, value[valueKey]]);
  };

  compareOptions = (options1 = [], options2 = [], valueKey) => {
    try {
      if (Array.isArray(options1) && Array.isArray(options2)) {
        return options1.filter(item => {
          let result = options2.find(child => {
            if (valueKey && typeof valueKey === 'string') {
              return item[valueKey] === child;
            } else {
              return item === child;
            }
          });
          if (result) {
            return false;
          } else {
            return true;
          }
        });
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  getOptionName = (options, id) => {
    try {
      let result = options && Array.isArray(options) && options.find(item => item.id === id);
      if (result) {
        return result.name;
      } else {
        return id;
      }
    } catch (error) {
      console.error('Error getOptionName: ',error);
      return id;
    }
  };

  render() {
    const {
      options,
      input: { value },
      valueKey,
    } = this.props;

    return (
      <Box width={'100%'}>
        {value &&
          Array.isArray(value) &&
          value.map((item, index) => (
            <FlexStyled py={3} key={`FlexStyled-${index}`} width={'100%'} alignItems={'center'}>
              <ButtonBase onClick={() => this.onDelete(item)} type={'button'} variant={'empty'}>
                <SvgDelete />
              </ButtonBase>
              <Text
                textAlign={'center'}
                width={'100%'}
                fontSize={6}
                lineHeight={8}
                fontFamily={'primary300'}
                color={'color3'}>
                {this.getOptionName(options, item)}
              </Text>
            </FlexStyled>
          ))}

        <SelectBase
          placeholder={'Добавить нового согласующего'}
          {...this.props}
          onChange={this.onChange}
          options={this.compareOptions(options, value, valueKey)}
          styles={NewSelectStyles}
          components={{ Control: ControlComponent }}
        />
      </Box>
    );
  }
}

export default TextFieldArray;
