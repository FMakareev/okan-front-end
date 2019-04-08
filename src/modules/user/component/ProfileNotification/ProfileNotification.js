import React  from 'react';
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
        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={[4]}
          fontFamily={'primary500'}>
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
