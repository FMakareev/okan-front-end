import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**Components */
import Text from '../../../../components/Text/Text';
import Flex from '../../../../components/Flex/Flex';
import Tbody from '../../../../components/Table/Tbody';
import Td from '../../../../components/Table/Td';
import Tr from '../../../../components/Table/Tr';

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

export class FormProfileApproval extends Component {
  static propTypes = {
    /** name document */
    name: PropTypes.string,
    /** number document*/
    number: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      initialValues
    } = this.props;

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
  }
}

export default FormProfileApproval;
