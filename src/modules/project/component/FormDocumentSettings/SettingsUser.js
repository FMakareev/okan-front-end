import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

/**View */
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';
import Text from '@lib/ui/Text/Text';
import CheckboxBase from '@lib/ui/CheckboxBase/CheckboxBase';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';

const FlexStyled = styled(Flex)`
  border-top: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color7' })};
  padding-bottom: 12px;
  min-height: 45px;
`;

export class SettingsUser extends Component {
  static propTypes = {
    /** Data  */
    data: PropTypes.element,
  };

  state = { userIsFound: false };

  submit = id => {
    try {
      const {
        input: { value, onChange },
      } = this.props;

      const filterId = value.filter(item => item === id);

      if (filterId.length !== 0) {
        return onChange([...value]);
      } else {
        return onChange([...value, id]);
      }
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  onChange = id => {
    const {
      input: { value, onChange },
    } = this.props;

    let indexCurrentId = this.findUserInValue(value, id);

    if (indexCurrentId !== -1) {
      onChange(this.removeFromArrayById(value, indexCurrentId));
    } else {
      onChange([...value, id]);
    }
  };

  findUserInValue = (value, id) => {
    if (Array.isArray(value) && typeof id !== 'undefined') {
      return value.findIndex(item => item === id);
    } else {
      return false;
    }
  };

  removeFromArrayById(arr, indexes) {
    let arrayOfIndexes = [].slice.call(arguments, 1);
    return arr.filter(function(item, index) {
      return arrayOfIndexes.indexOf(index) === -1;
    });
  }

  render() {
    const { options, input } = this.props;

    return (
      <Fragment>
        <Box mb={'100px'}>
          <Text
            fontSize={6}
            lineHeight={8}
            color={'color7'}
            textAlign={'center'}
            mb={6}
            fontFamily={'primary500'}>
            Участники проекта
          </Text>

          {options &&
            options.map(item => {
              const { id } = item;
              return (
                <FlexStyled
                  onClick={() => {
                    this.onChange(item.id);
                  }}
                  pt={3}>
                  <CheckboxBase checked={this.findUserInValue(input.value, item.id) >= 0} />

                  <Text
                    fontFamily={'primary300'}
                    fontSize={6}
                    lineHeight={8}
                    color={'color11'}
                    ml={20}>
                    {item.name}
                  </Text>
                </FlexStyled>
              );
            })}
        </Box>
      </Fragment>
    );
  }
}

export default SettingsUser;
