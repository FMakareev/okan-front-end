import React from 'react';
import { FieldArray } from 'redux-form';

/** View */
import Text from '@lib/ui/Text/Text';
import Container from '@lib/ui/Container/Container';

/** Component */
import FieldArrayInternalUser from '../FieldArrayInternalUser/FieldArrayInternalUser';

export const FieldArrayInternalUserWithTitle = ({ name, title }) => {
  return (
    <Container maxWidth={'500px'} width={'100%'}>
      <Text variant={'documentTitle'} mb={6}>
        {title}
      </Text>
      <FieldArray name={name} component={FieldArrayInternalUser} />
    </Container>
  );
};

export default FieldArrayInternalUserWithTitle;
