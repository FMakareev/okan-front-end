import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

/**View */
import Flex from '@lib/ui/Flex/Flex';
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';
import RichTextEditor from '@lib/ui/RichTextEditor/RichTextEditor';

export const TitlePage = () => {
  return (
    <Box>
      <Text variant={'documentTitle'} mb={6}>
        Титульный лист
      </Text>

      <Flex width={'400px'}>
        <Field name="documentSetting10" component={RichTextEditor} type="text" />
      </Flex>
    </Box>
  );
};

TitlePage.propTypes = {};

export default TitlePage;
