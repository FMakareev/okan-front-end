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
import {error, success} from "react-notification-system-redux";

const has = Object.prototype.hasOwnProperty;

const notificationDocumentSettingsPage = () => ({
  error: {
    title: 'Ошибка инициализации.',
    message: 'Во время инициализации формы произошла ошибка, попробуйте перезагрузит страницу если это не поможет обратитесь в поддержку.',
    position: 'tr',
    autoDismiss: 2,
  },
});

class DocumentSettingsPage extends Component {
  static propTypes = {...ReactRoutePropTypes};

  state = {};

  /**
   * @param {array} approvallist - список согласующиъ/утверждающих externalapprove, externalconform
   * @param {array} userList - просто список пользователей
   * @desc метод преобразует данные из списков externalapprove, externalconform в валидную для формы структуру
   * */
  createContractorApprovalList = (approvallist, userList) => {
    const newApprovalList = [];
    approvallist.forEach(item => {
      const indexUser = userList.findIndex(user => user.id === item.user);
      if (indexUser >= 0) {
        newApprovalList.push({
          user: {
            ...userList[indexUser],
            role: userList[indexUser].role.name
          },
          approvaldate: item.approvaldate
        });
      }
    });
    return newApprovalList;
  };

  /**
   * @param {object} value
   * @param {object} value.documentitem - данные иззапроса документа
   * @return {object} возвращает объект с данными для формы
   * @desc метод формирует объект для инициализации формы
   * */
  createInitialValues = ({documentitem}) => {
    const {setNotificationError} = this.props;

    try {
      return {
        ...documentitem,
        partners: documentitem
          ? documentitem.partners.map(item => item.id)
          : [],
      };
    } catch (error) {
      console.error('Error createInitialValues: ', error);
      setNotificationError(notificationDocumentSettingsPage().error);
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

DocumentSettingsPage = connect(
  state => ({
    user: getUserFromStore(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(DocumentSettingsPage);

export default DocumentSettingsPage;
