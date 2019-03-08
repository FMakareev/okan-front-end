import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';

/** View */
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';
import Text from '@lib/ui/Text/Text';

/** Constants */
import { BLOCK_IMAGE } from '../../../../shared/blockType';

const Button = styled(ButtonBase)`
  ${props => color({ ...props, color: 'color4' })};
  border: 1px solid;
`;

export const EditorAdditionalMenuButtonImage = props => {
  return (
    <Button variant={'empty'} width={'100px'} onClick={() => props.handleButtonPress(BLOCK_IMAGE)}>
      <Text color={'color4'} fontSize={5} lineHeight={6}>
        Рисунок
      </Text>
    </Button>
  );
};

EditorAdditionalMenuButtonImage.propTypes = {
  handleButtonPress: PropTypes.func.isRequired
};

EditorAdditionalMenuButtonImage.defaultProps = {};

export default EditorAdditionalMenuButtonImage;
