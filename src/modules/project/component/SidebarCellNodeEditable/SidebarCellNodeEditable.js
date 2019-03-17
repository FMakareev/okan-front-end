import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextareaStyled = styled.textarea`
  max-width: 150px;
  width: 100%;
`;


export const SidebarCellNodeEditable = React.forwardRef(
  (
    {
      html,
      focused,
      onChange,
      id,
      onToggle,
      updateCellMutation,
    },
    ref,
  ) => {
    if (!focused) {
      return html;
    } else {
      return (
        <TextareaStyled
          ref={ref}
          value={html}
          autoFocus={focused}
          disabled={!focused}
          onKeyUp={event => {
            if (event.key === 'Enter') {
              event.persist();
              onToggle();
              updateCellMutation(id, html)
            }
          }}
          onBlur={() => {
            if (focused) {
              onToggle();
            }
            updateCellMutation(id, html)
          }}
          onClick={event => {
            if (focused) {
              event.stopPropagation();
            }
          }}
          onChange={onChange}
        />
      );
    }
  },
);

SidebarCellNodeEditable.propTypes = {
  id: PropTypes.string.isRequired,
  html: PropTypes.string,
  focused: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default SidebarCellNodeEditable;
