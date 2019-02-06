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

export const SidebarCellNodeEditable = React.forwardRef(({html, focused, onChange, id, onToggle}, ref) => {
  return (<Mutation
    onError={() => {
    }}
    mutation={UpdateCellMutation}
  >
    {
      (mutate, {called, data, error, loading}) => {
        // console.log(mutate, { called, data, error, loading });

        if (!focused) {
          return html
        } else {
          return (<textarea
            ref={ref}
            value={html}
            autoFocus={focused}
            disabled={!focused}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                event.persist();
                onToggle();
                mutate({variables: {id, name: html}});
              }
            }}
            onBlur={() => {
              if (focused) {
                onToggle();
                mutate({variables: {id, name: html}});
              }
            }}
            onClick={(event) => {
              if (focused) {
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
  focused: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default SidebarCellNodeEditable;
