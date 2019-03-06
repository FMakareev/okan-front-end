import React, { Component } from 'react';
import {withApollo} from 'react-apollo';
import NotificationListQuery from './NotificationListQuery.graphql';

import Link from '@lib/ui/Link/Link';
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';

/** Redux */
import { connect } from 'react-redux';
import { info } from 'react-notification-system-redux';


export class NotificationsListObserver extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
            timer: null,
        };
    }

    componentDidMount() {
        this.props.user && this.startObserving();
    }

    componentWillUnmount() {
        this.stopObserving();
    }

    /**
     * @desc метод запускает таймер в 60 секунд 
     * для получениия списка уведомлений
     * */
    startObserving = () => {
        const timer = setInterval(this.observeNotifications, 60000);
        this.setState(state => ({
            ...state,
            timer: timer,
        }));
    };

    /**
     * @desc метод обнуляет таймер
     * */
    stopObserving = () => {
        clearInterval(this.state.timer);
        this.setState(state => ({
          ...state,
          timer: null,
        }));
    };

    /**
     * @desc метод получает уведомления из бд
     * вызывается по таймеру
     * */
    observeNotifications = () => {
        this.props.client.query({
            query: NotificationListQuery,
            variables: {
                user: this.props.user.id,
                messageread: false
            }
        })
        .then(response => {
            this.showNotifications(response.data.notificationslist);
            return response;
        })
        .catch(error => {
            console.log('Error while getting notifications: ', error);
            throw error;
        });        
    };

    /**
     * @desc метод устанавливает опции отображения уведомления
     * @augments { свойства объекта Notification, элемента массива notificationlist из бд  }
     * */
    setOptions = ({ sender, createat, comment, document, cell }) => {
        let link = `/app/project/${document.project}/${document.id}/${cell.parent.id}?cellid=${comment.cell}&сommentid=${comment.id}`;

        let options = {
            position: 'br',
            dismissible: 'button',
            autoDismiss: 10,
            children: (
                <Box>
                    <Text fontSize={4} color={'color4'} cursor={'default'} lineHeight={8}>
                        {dayjs(createat).format('DD.MM.YYYY HH:mm:ss')}
                    </Text>
                    <Text fontWeight={700} color={'color11'} cursor={'default'}>
                        Добавлен&nbsp;
                        <Link to={link} color={'color7'}>
                            комментарий&nbsp;
                            "{comment.message}"
                        </Link>
                    </Text>
                    <Text fontSize={4} color={'color4'} cursor={'default'} lineHeight={8}>
                        Автор: {sender.firstname} {sender.lastname}
                    </Text>
                </Box>
            )
        };
        return options;
    };

    /**
     * @desc вызываем setOptions для каждого полученного уведомления,
     * выводим уведомления
     * */
    showNotifications = (list) => {
        if (Array.isArray(list) && list.length > 0) {
            list.forEach((item, i, arr) => {
                console.log(item)
                let notification = this.setOptions(item);
                this.props.setNotification(notification)
            });
        }
    };
    
    render() {
        return (
        <div></div>
        )
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
