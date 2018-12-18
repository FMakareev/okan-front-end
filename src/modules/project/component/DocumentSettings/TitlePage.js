import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/**View */
import Flex from '../../../../components/Flex/Flex';
import Text from '../../../../components/Text/Text';
import Box from '../../../../components/Box/Box';
import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor';

export class TitlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Box>
        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={6} fontFamily={'primary500'}>
          Титульный лист
        </Text>

        <Flex width={'400px'}>
          <Field name="documentSetting10" component={RichTextEditor} type="text" />
        </Flex>
      </Box>
    );
  }
}

TitlePage = reduxForm({
  form: 'TitlePage',
})(TitlePage);

export default TitlePage;
