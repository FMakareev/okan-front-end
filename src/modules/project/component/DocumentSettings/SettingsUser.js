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
`;

export class SettingsUser extends Component {
  static propTypes = {
    /** Data  */
    data: PropTypes.element,
  };

  submit = id => {
    return id;
    this.onChange();
  };

  render() {
    const { options, fields } = this.props;
    console.log(1, this.props);
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

          {options.map((item, index) => {
            const { id } = item;
            return (
              <FlexStyled pt={3}>
                <CheckboxBase
                  onClick={() => {
                    this.props.input.onChange(id);
                  }}
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
