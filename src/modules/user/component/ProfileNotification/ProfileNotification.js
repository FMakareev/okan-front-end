import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

/**View */
import Text from '@lib/ui/Text/Text';

/** Components */
import ProfileNotificationItem from '../ProfileNotificationItem/ProfileNotificationItem';

export const ProfileNotification = ({ data }) => {
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

      {data &&
        data.map((item, index) => (
          <ProfileNotificationItem key={`ProfileNotificationItem-${index}`} {...item} />
        ))}
    </Fragment>
  );
};

ProfileNotification.propTypes = {
  /** message user*/
  message: PropTypes.string,
};

export default ProfileNotification;
