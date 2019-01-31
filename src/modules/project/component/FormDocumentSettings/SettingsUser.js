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
    console.log(11111, id);

    try {
      const { input } = this.props;

      const filterId = input.value.filter(item => item === id);

      if (filterId.length !== 0) {
        return input.onChange([...input.value]);
      } else {
        return input.onChange([...input.value, id]);
      }
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  change = id => {
    const {
      input: { value, onChange },
    } = this.props;

    const checkedId = arr => arr === id;
    const result = value.some(checkedId);

    if (result) {
      onChange(result);
      this.setState(({ userIsFound }) => {
        userIsFound: true;
      });
    }
  };

  render() {
    const { options, input } = this.props;
    const { userIsFound } = this.state;

    const RenderUserList = this.props.input.value === 0 ? null : {};

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

          {RenderUserList &&
            options.map(item => {
              const { id } = item;
              return (
                <FlexStyled pt={3}>
                  <CheckboxBase
                    onClick={() => {
                      this.submit(id);
                    }}
                    onChange={() => {
                      this.change(id);
                    }}
                    checked={userIsFound}
                    id={id}
                    input={input}
                  />

                  <Text
                    fontFamily={'primary300'}
                    fontSize={6}
                    lineHeight={8}
                    color={'color11'}
                    ml={20}>
                    {item.firstname}
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
