import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

/**View */
import Text from '@lib/ui/Text/Text';
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';
import PaginationPage from '@lib/ui/PaginationPage/PaginationPage';

/** Components */
import ProfileNotificationItem from '../ProfileNotificationItem/ProfileNotificationItem';

export const ProfileNotification = ({ data, pageNumber, pageSize }, props) => {
  console.log(props);
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

// <PaginationPage pageNumber={pageNumber} pageSize={pageSize} data={data} Component={ProfileNotificationItem} />;
