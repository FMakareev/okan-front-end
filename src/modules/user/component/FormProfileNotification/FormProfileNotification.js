import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View */
import Text from '../../../../components/Text/Text';

/** Components */
import FormProfileNotificationItem from '../FormProfileNotificationItem/FormProfileNotificationItem';

export const FormProfileNotification = ({ initialValues}) => {
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

        <FormProfileNotificationItem message={'1'} name={'Фамилия Имя'} time={'Время'} />
      </Fragment>
    );
}

FormProfileNotification.propTypes = {
    /** message user*/
    message: PropTypes.string,
  };
    

export default FormProfileNotification;
