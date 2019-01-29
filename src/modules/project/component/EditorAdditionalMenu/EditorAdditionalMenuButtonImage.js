import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';

/** Image */
import pictureIcon from '../../../../assets/image/pictureIcon.png';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Text from '../../../../components/Text/Text';

const Button = styled(ButtonBase)`
  ${props => color({ ...props, color: 'color4' })};
  border: 1px solid;
`;

export const EditorAdditionalMenuButtonImage = () => {
  return (
    <Button variant={'empty'} width={'100px'}>
      <Text color={'color4'} fontSize={5} lineHeight={6}>
        Рисунок
      </Text>
    </Button>
  );
};

EditorAdditionalMenuButtonImage.propTypes = {};

EditorAdditionalMenuButtonImage.defaultProps = {};

export default EditorAdditionalMenuButtonImage;
