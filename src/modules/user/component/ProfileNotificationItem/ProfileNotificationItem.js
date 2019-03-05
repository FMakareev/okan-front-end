import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import PropTypes from 'prop-types';
import { color } from 'styled-system';

/**View */
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';
import Flex from '@lib/ui/Flex/Flex';
import Link from '@lib/ui/Link/Link';

/** Styles property */
import BackgroundColorProperty from '../../../../styles/styleProperty/BackgroundColorProperty';
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontFamilyProperty from '../../../../styles/styleProperty/FontFamilyProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';

const TextStyled = styled(Text)`
  padding: 5px;
  border: 1px solid;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color13' })};
`;

const FlexStyled = styled(Flex)`
  width: 50%;
  padding: 5px;
  border-left: 1px solid;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  ${props => FontFamilyProperty({ ...props, fontFamily: 'secondary' })};
  ${props => color({ ...props, color: 'color11' })};
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BackgroundColorProperty({ ...props, backgroundColor: 'color13' })};
  ${props => FontSizeProperty({ ...props, fontSize: 5 })};
  ${props => LineHeightProperty({ ...props, lineHeight: 7 })};
  min-width: 160px;
  overflow: hidden;

  @media (min-width: 768px) {
    display: inline-flex;
  }
`;
// TODO: для сообщений добавить руссификацию или на беке сразу на русском подробный месдж
export const ProfileNotificationItem = ({ message, sender, name, createat, comment, document, cell }) => {
  // to={`http://okan.localhost/app/project/${document.project}/${document.id}`}

  let link = '/app/project/' + 
              document.project + '/' + 
              document.id + '/' + 
              cell.parent.id + '?cellid=' +
              comment.cell + '&сommentid=' + 
              comment.id;

  console.log(document.name)

  return (
    <Box mb={[4]}>
      <TextStyled fontSize={6} lineHeight={8} color={'color11'} fontFamily={'secondary'}>
        Добавлен&nbsp;
        <Link to={link} color={'color7'}>
          комментарий&nbsp;
          "{comment.message || message}"
        </Link>
      </TextStyled>

      <FlexStyled>
        <Text>
          Создан: {dayjs(createat).format('DD.MM.YYYY HH:mm:ss')}
        </Text>
      </FlexStyled>
      <FlexStyled>
        <Text>
          Автор: {sender.firstname} {sender.lastname}
        </Text>
      </FlexStyled>
    </Box>
  );
};

export default ProfileNotificationItem;
