import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { error, success } from 'react-notification-system-redux';

/** Graphql schema */
import UpdateCellMutation from './UpdateCellMutation.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

const TextareaStyled = styled.textarea`
  max-width: 150px;
  width: 100%;
`;

const UpdateCache = (store, { data: { updatecell } }, onError) => {
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
        cellitem: updatecell.cell,
      },
    });
  } catch (error) {
    console.error('Error UpdateCache: ', error);
  }
};

const UpdateCell = (mutate, { id, html }, callback) => {
  return mutate({ variables: { id, name: html }, update: UpdateCache });
};

const notificationOpts = () => ({
  success: {
    title: 'Раздел обновлен',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Раздел не обновлен',
    position: 'tr',
    autoDismiss: 2,
  },
});

export const SidebarCellNodeEditable = React.forwardRef(
  (
    {
      html,
      prevHtml,
      focused,
      onChange,
      id,
      onToggle,
      onError,
      setNotificationError,
      setNotificationSuccess,
    },
    ref,
  ) => {
    return (
      <Mutation
        onCompleted={() => {
          if (prevHtml !== html) {
            setNotificationSuccess(notificationOpts().success);
          }
        }}
        onError={error => {
          console.error('ErrorSidebarCellNodeEditable: ', error);
          onError(error);
          setNotificationError(notificationOpts().error);
        }}
        mutation={UpdateCellMutation}>
        {(mutate, { called, data, error, loading }) => {
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
                    if (prevHtml !== html) {
                      UpdateCell(mutate, { id, html }, onError);
                    }
                  }
                }}
                onBlur={() => {
                  if (focused) {
                    onToggle();
                  }
                  if (prevHtml !== html) {
                    UpdateCell(mutate, { id, html }, onError);
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
  setNotificationError: PropTypes.func.isRequired,
  setNotificationSuccess: PropTypes.func.isRequired,
};

export default SidebarCellNodeEditable;
