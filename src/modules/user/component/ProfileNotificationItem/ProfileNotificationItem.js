import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color } from 'styled-system';

/**View */
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';
import Flex from '@lib/ui/Flex/Flex';

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
    display: block;
  }

  @media (min-width: 1300px) {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
`;

export const ProfileNotificationItem = ({ message, name, time }) => {
  return (
    <Box mb={[4]}>
      <TextStyled fontSize={6} lineHeight={8} color={'color11'} fontFamily={'secondary'}>
        {message}
      </TextStyled>

      <FlexStyled width={'25%'}>
        <Text>{name} /</Text>
        <Text>{time}</Text>
      </FlexStyled>
    </Box>
  );
};

export default ProfileNotificationItem;
