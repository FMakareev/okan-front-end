import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**View */
import Text from '@lib/ui/Text/Text';

/** Components */
import ProfileNotificationItem from '../ProfileNotificationItem/ProfileNotificationItem';

export const ProfileNotification = ({ initialValues }) => {
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

      <ProfileNotificationItem message={'1'} name={'Фамилия Имя'} time={'Время'} />
    </Fragment>
  );
};

ProfileNotification.propTypes = {
  /** message user*/
  message: PropTypes.string,
};

export default ProfileNotification;
