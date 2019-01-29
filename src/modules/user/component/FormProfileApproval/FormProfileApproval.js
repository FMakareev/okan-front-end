import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**Components */
import Text from '@lib/ui/Text/Text';
import Flex from '@lib/ui/Flex/Flex';
import Tbody from '@lib/ui/Table/Tbody';
import Td from '@lib/ui/Table/Td';
import Tr from '@lib/ui/Table/Tr';

const TrStyled = styled(Tr)`
  display: flex;
  justify-content: space-around;
  padding: 3px 0;
  cursor: pointer;

  &:hover {
    background-color: #007faf21;
  }
`;

const TbodyStyled = styled(Tbody)`
  border: 1px solid #848484;
  border-radius: 5px;
  margin: 10px 0 0 0;
`;

export const FormProfileApproval = ({ initialValues }) => {
  return (
    <Fragment>
      <Text
        fontSize={6}
        lineHeight={8}
        color={'color7'}
        textAlign={'center'}
        mb={[13]}
        fontFamily={'primary500'}>
        На согласование
      </Text>
      <Tbody>
        <Flex justifyContent={'space-around'}>
          <Text fontSize={6} lineHeight={8} fontFamily={'primary500'}>
            Номер документа
          </Text>

          <Text fontSize={6} lineHeight={8} fontFamily={'primary500'}>
            Название документа
          </Text>
        </Flex>
      </Tbody>
      {/*initialValues.map(item=>item.name)*/}
      <TbodyStyled>
        <TrStyled>
          <Td fontFamily={'primary500'}>{'1'}</Td>
          <Td fontFamily={'secondaryBold'}>{'2'}</Td>
        </TrStyled>
      </TbodyStyled>

      <TbodyStyled>
        <TrStyled>
          <Td fontFamily={'primary500'}>{'1'}</Td>
          <Td fontFamily={'secondaryBold'}>{'2'}</Td>
        </TrStyled>
      </TbodyStyled>
    </Fragment>
  );
};

FormProfileApproval.propTypes = {
  /** name document */
  name: PropTypes.string,
  /** number document*/
  number: PropTypes.string,
};

export default FormProfileApproval;
