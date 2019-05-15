import React from 'react';
import PropTypes from 'prop-types';

/**View */
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';

/** Components */
import ProfileNotificationItem from '../ProfileNotificationItem/ProfileNotificationItem';

export const ProfileNotification = ({ data }) => {
  return (
    <>
      <Box mb={[8]}>
        <Text variant={'documentTitle'} mb={4}>
          Оповещения
        </Text>
      </Box>
      {data && data.map(item => <ProfileNotificationItem {...item} />)}
    </>
  );
};

ProfileNotification.propTypes = {
  /** message user*/
  message: PropTypes.string,
};

export default ProfileNotification;
