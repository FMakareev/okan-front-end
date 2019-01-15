import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View */
import Text from '../../../../components/Text/Text';

/** Components */
import FormProfileNotificationItem from '../FormProfileNotificationItem/FormProfileNotificationItem';

export class FormProfileNotification extends Component {
  static propTypes = {
    /** id user */
    // id:PropTypes.string,
    /** message user*/
    message: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data: {
        // id,
        message,
      },
    } = this.props;

    return (
      <Fragment>
        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={[4]}
          fontFamily={'primary500'}>
          Оповещения
        </Text>

        <FormProfileNotificationItem message={message} name={'Фамилия Имя'} time={'Время'} />
      </Fragment>
    );
  }
}

export default FormProfileNotification;
