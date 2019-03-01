import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Query} from 'react-apollo';

/** Redux user */
import {getUserFromStore} from '../../../../store/reducers/user/selectors';

/**PropTypes */
import {ReactRoutePropTypes} from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';

/** Components */
import FormDocumentSettings from '../../component/FormDocumentSettings/FormDocumentSettings';

/** Graphql schema */
import DocumentItemQuery from './DocumentItemQuery.graphql';

const has = Object.prototype.hasOwnProperty;
const testData = {
  documentitem: {
    customercode: null,
    equipmentname: null,
    id: "5c76a94f9adb4973cf701b3d",
    name: "afsfa",
    okancode: null,
    partners: [],
    project: "5c76931c9adb4973cf701b29",
    externalapprove: [
      {
        user: '5c76c63d335cf439ffd8148e',
        approvaldate: '2019-03-01T00:59:08.468Z',
      },
      {
        user: '5c76c63d335cf439ffd8148f',
        approvaldate: '2019-02-01T00:59:08.468Z',
      },
      {
        user: '5c76c63d335cf439ffd81490',
        approvaldate: '2019-01-01T00:59:08.468Z',
      },
    ],
    externalconform: [
      {
        user: '5c76c63d335cf439ffd81498',
        approvaldate: '2019-02-22T00:59:08.468Z',
      },
      {
        user: '5c76c63d335cf439ffd814a1',
        approvaldate: '2019-02-22T00:59:08.468Z',
      },
    ],
    __typename: "Document",
  }
};

class DocumentSettingsPage extends Component {
  static propTypes = {...ReactRoutePropTypes};

  state = {};

  createContractorApprovalList = (approvallist, userlist) => {
    try {
      return approvallist.map(item => {
        const indexUser = userlist.findIndex(user => user.id === item.user);
        if (indexUser >= 0) {
          return {
            user: {
              ...userlist[indexUser],
              role: userlist[indexUser].role.name
            },
            approvaldate: item.approvaldate
          }
        }
      })
    } catch (error) {
      console.error('Error createContractorApprovalList: ', error);
      return error;
    }
  };

  // TODO: в запрос userlist Добавить подпись, организацию и должность
  // TODO: добавить описание методов
  createInitialValues = ({documentitem, userlist}) => {
    try {
      const initialValues = {
        ...documentitem,
        partners: documentitem
          ? documentitem.partners.map(item => item.id)
          : [],
      };

      if (initialValues.externalapprove) {
        initialValues.externalapprove = this.createContractorApprovalList(initialValues.externalapprove, userlist);
      }
      if (initialValues.externalconform) {
        initialValues.externalconform = this.createContractorApprovalList(initialValues.externalconform, userlist);
      }

      return initialValues;
    } catch (error) {
      console.error('Error createInitialValues: ', error);
      // TODO: вставить уведомление о ошибке инициализации формы
      return {};
    }
  };

  render() {
    const {
      match: {
        params: {id},
      },
    } = this.props;

    return (
      <ErrorCatch>
        <Query query={DocumentItemQuery} variables={{id: id}}>
          {({data, error, loading}) => {
            // console.log('DocumentItemQuery', data);

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
                initialValues={this.createInitialValues(data)}
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
