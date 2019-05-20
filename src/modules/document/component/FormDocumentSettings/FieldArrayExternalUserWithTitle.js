import React from 'react';
import { FieldArray } from 'redux-form';

/** View */
import Text from '@lib/ui/Text/Text';
import Container from '@lib/ui/Container/Container';

/** Component */
import FieldArrayExternalUser from '../FieldArrayExternalUser/FieldArrayExternalUser';

export const FieldArrayExternalUserWithTitle = ({ name, title }) => {
  return (
    <Container maxWidth={'500px'} width={'100%'}>
      <Text variant={'documentTitle'} mb={6}>
        {title}
      </Text>
      <FieldArray name={name} component={FieldArrayExternalUser} />
    </Container>
  );
};

export default FieldArrayExternalUserWithTitle;
