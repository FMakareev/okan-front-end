import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Mutation} from 'react-apollo';
import UpdateCellMutation from './UpdateCellMutation.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

const TextareaStyled = styled.textarea`
  max-width: 150px;
  width: 100%;

`;


const UpdateCache = (store, {data: {updatecell}}) => {
  try {
    let options = {
      query: CellItemQuery,
      variables: {
        id: updatecell.cell.id,
      },
    };

    store.writeQuery({
      ...options,
      data: {
        cellitem:updatecell.cell,
      },
    });
  } catch (error) {
    console.error('Error UpdateCache: ', error);
  }
};


// TODO: добавить таймер для автоматического схранения данных и стэйт перенести сюда

export const SidebarCellNodeEditable = React.forwardRef(
  ({html, focused, onChange, id, onToggle}, ref) => {
    return (
      <Mutation onError={() => {
      }} mutation={UpdateCellMutation}>
        {(mutate, {called, data, error, loading}) => {
          // console.log(mutate, { called, data, error, loading });

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
                    mutate({variables: {id, name: html}, update: UpdateCache});
                  }
                }}
                onBlur={() => {
                  if (focused) {
                    onToggle();
                    mutate({variables: {id, name: html}, update: UpdateCache});
                  }
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
        }}
      </Mutation>
    );
  },
);

SidebarCellNodeEditable.propTypes = {
  id: PropTypes.string.isRequired,
  html: PropTypes.string,
  focused: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default SidebarCellNodeEditable;
