import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**Components */
import Text from '@lib/ui/Text/Text';
import Flex from '@lib/ui/Flex/Flex';
import Tbody from '@lib/ui/Table/Tbody';
import { Box } from '@lib/ui/Box/Box';
import Link from '@lib/ui/Link/Link';

/** Constants */
import { TO_APPROVAL } from '../../../../shared/approvalStatus';

const TrStyled = styled(Box)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  padding: 3px 0;
  cursor: pointer;

  &:hover {
    background-color: #007faf21;
  }
`;

const TbodyStyled = styled(Box)`
  border: 1px solid #848484;
  border-radius: 5px;
  margin: 10px 0 0 0;
  width: 100%;
`;

const LinkStyled = styled(Link)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`;

const TdStyle = styled(Box)`
  width: 50%;
  padding: 0 5px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #4f4f4f;
`;

export const ProfileApproval = ({ data }) => {
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
      <Flex justifyContent={'space-around'}>
        <Text fontSize={6} lineHeight={8} fontFamily={'primary500'}>
          Номер документа
        </Text>

        <Text fontSize={6} lineHeight={8} fontFamily={'primary500'}>
          Название документа
        </Text>
      </Flex>
      {Array.isArray(data) &&
        data.map(
          item =>
            item.approvalstatus === TO_APPROVAL && (
              <LinkStyled
                key={`ProfileApproval-${item.id}`}
                to={`/app/document-commenting/${item.project}/${item.id}`}>
                <TbodyStyled>
                  <TrStyled>
                    <TdStyle title={item.okancode} fontFamily={'primary500'}>
                      {item.okancode}
                    </TdStyle>
                    <TdStyle title={item.name} fontFamily={'secondaryBold'}>
                      {item.name}
                    </TdStyle>
                  </TrStyled>
                </TbodyStyled>
              </LinkStyled>
            ),
        )}
    </Fragment>
  );
};

ProfileApproval.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      /** name document */
      name: PropTypes.string,
      /** number document*/
      documentnumber: PropTypes.string,
    }),
  ),
};

export default ProfileApproval;
