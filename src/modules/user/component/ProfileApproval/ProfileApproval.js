import React, { Fragment } from 'react';
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

export const ProfileApproval = ({ data }) => (
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
    {Array.isArray(data) &&
    data.map(item => {
      return (
        <TbodyStyled>
          <TrStyled>
            <Td fontFamily={'primary500'}>{item.name}</Td>
            <Td fontFamily={'secondaryBold'}>{item.documentnumber}</Td>
          </TrStyled>
        </TbodyStyled>
      );
    })}
  </Fragment>
);

ProfileApproval.propTypes = {
  data: PropTypes.arrayOf({
    id: PropTypes.string,
    /** name document */
    name: PropTypes.string,
    /** number document*/
    documentnumber: PropTypes.string,
  }),
};

export default ProfileApproval;