import React from 'react';
import ContentEditable from "react-contenteditable";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Mutation} from 'react-apollo';
import UpdateCellMutation from './UpdateCellMutation.graphql';
import {Text} from "@lib/ui/Text/Text";

const ContentEditableStyled = styled(ContentEditable)`
  max-width: 90%;
  ${({disabled}) => disabled ? '' : `
    border: 1px solid;
    border-color: #2290ba;
    border-radius: 4px;
    box-shadow: 0 0 4px 0px rgba(0,127,175,1);
  `}
`;

// TODO: добавить таймер для автоматического схранения данных и стэйт перенести сюда

export const SidebarCellNodeEditable = React.forwardRef(({html, disabled, onChange, id, onToggle}, ref) => {
  return (<Mutation
    onError={() => {
    }}
    mutation={UpdateCellMutation}
  >
    {
      (mutate, {called, data, error, loading}) => {
        // console.log(mutate, { called, data, error, loading });

        if (disabled) {
          return html
        } else {
          return (<textarea
            ref={ref}
            value={html}
            autoFocus={!disabled}
            disabled={disabled}
            onBlur={() => {

              mutate({variables: {id, name: html}});
              onToggle();
            }}
            onClick={(event) => {
              if (!disabled) {
                event.stopPropagation();
              }
            }}
            onChange={onChange}
          />)
        }
      }
    }
  </Mutation>)
});

SidebarCellNodeEditable.propTypes = {
  id: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default SidebarCellNodeEditable;
