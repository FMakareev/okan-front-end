import React from 'react';
import { FieldArray } from 'redux-form';

/** View */
import Text from '@lib/ui/Text/Text';
import Container from '@lib/ui/Container/Container';


export const FieldArrayWithTitle = ({ name, title, component }) => {
  return (
    <Container maxWidth={'500px'} width={'100%'}>
      <Text variant={'documentTitle'} mb={6}>
        {title}
      </Text>
      <FieldArray name={name} component={component} />
    </Container>
  );
};

export default FieldArrayWithTitle;
