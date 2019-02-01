import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

/** View */
import Flex from '@lib/ui/Flex/Flex';
import Text from '@lib/ui/Text/Text';
import Image from '@lib/ui/Image/Image';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';
import Link from '@lib/ui/Link/Link';

/** Image */
import settings from '../../../../assets/image/settings.png';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';

const FlexStyled = styled(Flex)`
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color11' })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
`;


export let ProjectItem = ({ id, name, history }) => (
  <Link mr={6} to={`/app/project/${id}`} textDecoration={'none'}>
    <FlexStyled
      alignItems={'center'}
      justifyContent={'space-between'}
      pr={'20px'}
      pl={'50px'}
      py={3}
      mb={4}>
      <Text color={'color11'} fontFamily={'secondaryBold'} fontSize={6} lineHeight={8}>
        {name}
      </Text>
      <ButtonWithImage
        onClick={event => {
          try {
            event.stopPropagation();
            event.preventDefault();
            history.push(`/app/project-settings/${id}`);
          } catch (error) {
            console.error(`Error ProjectItem id=${id}:`, error);
          }
        }}
        type="button"
        variant={'empty'}>
        <Image src={settings} />
      </ButtonWithImage>
    </FlexStyled>
  </Link>
);

ProjectItem.propTypes = {
  /** id project */
  id: PropTypes.string,
  /** name project */
  name: PropTypes.string,
  /** history route */
  history: PropTypes.object,
};

ProjectItem = withRouter(ProjectItem);

export default ProjectItem;
