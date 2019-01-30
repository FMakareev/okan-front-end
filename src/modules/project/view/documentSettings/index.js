import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

/** Redux user */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';

/** Components */
import FormDocumentSettings from '../../component/FormDocumentSettings/FormDocumentSettings';

/** Graphql schema */
import DocumentItemQuery from './DocumentItemQuery.graphql';

const has = Object.prototype.hasOwnProperty;

class DocumentSettingsPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <ErrorCatch>
        <Query query={DocumentItemQuery} variables={{ id: params.id }}>
          {({ data, error, loading }) => {
            // console.log('DocumentItemQuery', data, error, loading);

            if (loading) {
              console.error('loading:', loading);
              return 'Загрузка ...';
            }
            if (error) {
              console.error('Error:', error);
              return 'Ошибка ...';
            }

            if (!data || (data && !has.call(data, 'documentitem'))) {
              return null;
            }

            return (
              <FormDocumentSettings
                initialValues={{
                  ...data.documentitem,
                  partners: data.documentitem
                    ? data.documentitem.partners.map(item => item.id)
                    : [],
                }}
              />
            );
          }}
        </Query>
      </ErrorCatch>
    );
  }
}

DocumentSettingsPage = connect(state => ({
  user: getUserFromStore(state),
}))(DocumentSettingsPage);

export default DocumentSettingsPage;
