import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import NotificationListQuery from './NotificationListQuery.graphql';
import dayjs from 'dayjs';

import Link from '@lib/ui/Link/Link';
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';

/** Redux */
import {connect} from 'react-redux';
import {info} from 'react-notification-system-redux';


const NotificationItem = ({createat, comment, sender, link}) => (<Box>
  <Text fontSize={4} color={'color4'} cursor={'default'} lineHeight={8}>
    {dayjs(createat).format('DD.MM.YYYY HH:mm:ss')}
  </Text>
  <Text fontWeight={700} color={'color11'} cursor={'default'}>
    Добавлен&nbsp;
    <Link target={'_blank'} to={link} color={'color7'}>
      комментарий&nbsp;
      "{comment.message}"
    </Link>
  </Text>
  <Text fontSize={4} color={'color4'} cursor={'default'} lineHeight={8}>
    Автор: {sender.firstname} {sender.lastname}
  </Text>
</Box>);


export class NotificationsListObserver extends Component {
  subscribeInstanceToNotifications = null;

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      timer: null,
    };
  }

  componentWillUnmount() {
    this.unsubscribeToCellItem();
  }

  componentDidMount() {
    if (isBrowser) {
      setTimeout(() => {
        this.observeNotifications();
      }, 5000);
    }
  }

  unsubscribeToCellItem = () => {
    if (this.subscribeInstanceToNotifications) {
      this.subscribeInstanceToNotifications.unsubscribe();
      this.subscribeInstanceToNotifications = null;
    }
  };

  /**
   * @desc метод получает уведомления из бд
   * вызывается по таймеру
   * */
  observeNotifications = () => {
    this.subscribeInstanceToNotifications = this.props.client.watchQuery({
      query: NotificationListQuery,
      pollInterval: 60000,
      fetchPolicy: 'no-cache',
      variables: {
        user: this.props.user.id,
        messageread: false
      }
    }).subscribe(({data}) => {
      this.showNotifications(data.notificationslist);
      return data;
    })
  };

  /**
   * @desc метод устанавливает опции отображения уведомления
   * @augments {object} свойства объекта Notification, элемента массива notificationlist из бд
   * */
  setOptions = ({sender, createat, comment, document, cell}) => {
    let link = `/app/project/${document.project}/${document.id}${cell.parent? `/${cell.parent.id}`: ''}?cellid=${comment.cell}&commentid=${comment.id}`;

    return {
      position: 'br',
      dismissible: 'button',
      autoDismiss: 6,
      children: <NotificationItem link={link} createat={createat} sender={sender} comment={comment}/>,
    };
  };

  /**
   * @desc вызываем setOptions для каждого полученного уведомления,
   * выводим уведомления
   * */
  showNotifications = (list) => {
    if (Array.isArray(list) && list.length > 0) {
      let interval = 1500;
      list.forEach((item, i, arr) => {
        interval += interval;
        setTimeout(() => {
          let notification = this.setOptions(item);
          this.props.setNotification(notification);
        }, interval);
      });
    }
  };

  render() {
    return null;
  }
}

NotificationsListObserver = withApollo(NotificationsListObserver);

NotificationsListObserver = connect(
  null,
  dispatch => ({
    setNotification: message => dispatch(info(message)),
  }),
)(NotificationsListObserver);

export default NotificationsListObserver;
