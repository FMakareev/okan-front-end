import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';

/** View */
import Text from '@lib/ui/Text/Text';
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';

/** Constants */
import { BLOCK_TABLE } from '../../../../shared/blockType';

const Button = styled(ButtonBase)`
  ${props => color({ ...props, color: 'color4' })};
  border: 1px solid;
`;

export const EditorAdditionalMenuButtonTable = props => {
  return (
    <Button variant={'empty'} width={'100px'} onClick={() => props.handleButtonPress(BLOCK_TABLE)}>
      <Text color={'color4'} fontSize={5} lineHeight={6}>
        Таблица
      </Text>
    </Button>
  );
};

EditorAdditionalMenuButtonTable.propTypes = {};

EditorAdditionalMenuButtonTable.defaultProps = {};

export default EditorAdditionalMenuButtonTable;
