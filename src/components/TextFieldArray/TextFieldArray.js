import React from 'react';
import styled from 'styled-components';
import { Box } from 'grid-styled';
import { Field } from 'redux-form';
import { Icon } from 'react-icons-kit';

/** Image */

import { SvgAdd } from '../Icons/SvgAdd';
import { SvgDelete } from '../Icons/SvgDelete';

/** view */
import TextFieldWithoutBorder from '../TextFieldWithoutBorder/TextFieldWithoutBorder';
import ButtonBase from '../ButtonBase/ButtonBase';
import Text from '../Text/Text';
import Flex from '../Flex/Flex';

const ButtonStyled = styled(ButtonBase)`
  border-top: 1px solid #00649c;
  border-radius: 0px;
`;

const FlexStyled = styled(Flex)`
  border-top: 1px solid #00649c;
  border-radius: 0px;
`;

/**
 * Компонент инпута c доабвлением еще инпутов (Text Field Array)
 * @example ./TextFieldArray.example.md
 */

export const TextFieldArray = ({
  fields,
  meta: { error, submitFailed },
  input,
  inputIcon,
  button,
  validateForm,
}) => (
  <Box width={'100%'}>
    {fields.map((items, index) => (
      <FlexStyled key={`TextFieldArray-${index}`} width={'100%'} alignItems={'center'}>
        <ButtonBase type={'button'} onClick={() => fields.remove(index)} variant={'empty'}>
          {SvgDelete()}
        </ButtonBase>

        <Field
          name={`${items}`}
          component={TextFieldWithoutBorder}
          type="text"
          fontSize={6}
          lineHeight={8}
          fontFamily={'primary300'}
        />
      </FlexStyled>
    ))}

    {
      <ButtonStyled
        width={'100%'}
        type={'button'}
        onClick={() => fields.push('')}
        variant={'empty'}>
        <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Box>{SvgAdd()}</Box>
          <Text color={'color4'} fontSize={6} lineHeight={8} py={3} fontFamily={'primary300'}>
            {button}
          </Text>
          <Box />
        </Flex>
      </ButtonStyled>
    }
  </Box>
);

export default TextFieldArray;
