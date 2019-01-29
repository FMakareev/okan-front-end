import React, { Fragment } from 'react';
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

export const SettingsUser = ({ data }) => {
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

        {data.map((item, index) => (
          <FlexStyled pt={3}>
            <Field name={`documentSetting${index}`} component={CheckboxBase} />

            <Text fontFamily={'primary300'} fontSize={6} lineHeight={8} color={'color11'} ml={20}>
              {item.firstname}
            </Text>
          </FlexStyled>
        ))}
      </Box>
    </Fragment>
  );
};

SettingsUser.propTypes = {
  /** Data  */
  data: PropTypes.element,
};

export default SettingsUser;
