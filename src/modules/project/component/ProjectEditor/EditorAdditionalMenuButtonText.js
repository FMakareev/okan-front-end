import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { color } from 'styled-system';

/** View */
import Text from '../../../../components/Text/Text';
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

const Button = styled(ButtonBase)`
  ${props => color({ ...props, color: 'color4' })};
  border: 1px solid;
`;

export const EditorAdditionalMenuButtonText = () => {
  return (
    <Button variant={'empty'} width={'100px'}>
      <Text color={'color4'} fontSize={5} lineHeight={6}>
        Tекст
      </Text>
    </Button>
  );
};

export default EditorAdditionalMenuButtonText;
