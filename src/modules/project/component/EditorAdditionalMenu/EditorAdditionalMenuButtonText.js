import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';

/** View */
import Text from '@lib/ui/Text/Text';
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';

import { BLOCK_TEXT } from '../../../../shared/blockType';

const Button = styled(ButtonBase)`
  ${props => color({ ...props, color: 'color4' })};
  border: 1px solid;
`;

export const EditorAdditionalMenuButtonText = ({handleButtonPress}) => {
  return (
    <Button variant={'empty'} width={'100px'} onClick={() => handleButtonPress(BLOCK_TEXT)}>
      <Text color={'color4'} fontSize={5} lineHeight={6}>
        Tекст
      </Text>
    </Button>
  );
};

EditorAdditionalMenuButtonText.propTypes = {
  handleButtonPress: PropTypes.func.isRequired
};

EditorAdditionalMenuButtonText.defaultProps = {};

export default EditorAdditionalMenuButtonText;
