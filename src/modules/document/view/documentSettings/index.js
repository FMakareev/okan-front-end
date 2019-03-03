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
   * @param {array} userlist - просто список пользователей
   * @desc метод преобразует данные из списков externalapprove, externalconform в валидную для формы структуру
   * */
  createContractorApprovalList = (approvallist, userlist) => {
    const newapprovallist = [];
    approvallist.forEach(item => {
      const indexUser = userlist.findIndex(user => user.id === item.user);
      if (indexUser >= 0) {
        newapprovallist.push({
          user: {
            ...userlist[indexUser],
            role: userlist[indexUser].role.name
          },
          approvaldate: item.approvaldate
        });
      }
    });
    return newapprovallist;
  };

  /**
   * @param {object} value
   * @param {object} value.documentitem - данные иззапроса документа
   * @param {object} value.userlist - список пользователей системы
   * @return {object} возвращает объект с данными для формы
   * @desc метод формирует объект для инициализации формы
   * */
  createInitialValues = ({documentitem, userlist}) => {
    const {setNotificationError} = this.props;

    try {
      return {
        ...documentitem,
        partners: documentitem
          ? documentitem.partners.map(item => item.id)
          : [],
      };

      // if (initialValues.externalapprove) {
      //   initialValues.externalapprove = this.createContractorApprovalList(initialValues.externalapprove, userlist);
      // }
      // if (initialValues.externalconform) {
      //   initialValues.externalconform = this.createContractorApprovalList(initialValues.externalconform, userlist);
      // }

      // return initialValues;
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
