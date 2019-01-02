import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Container from '../../../../components/Container/Container';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';

/**Image */
import { SvgSave } from '../../../../components/Icons/SvgSave';

/** Components */
import Settings from './Settings';
import TitlePage from './TitlePage';

class DocumentSettings extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {}

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Flex mt={9} justifyContent={'space-around'}>
          <Container maxWidth={'500px'} width={'100%'}>
            <Settings />
          </Container>

          <Container maxWidth={'400px'} width={'100%'}>
            <TitlePage />
          </Container>
        </Flex>

        <Flex justifyContent={'center'}>
          <ButtonWithImage
            type="submit"
            variant={'large'}
            size={'medium'}
            children={'Сохранить настройки'}
            leftIcon={SvgSave()}
            mr={9}
            disabled={pristine || submitting || invalid}
            width={'500px'}
            widthIcon={'16px'}
          />
        </Flex>
      </Form>
    );
  }
}

DocumentSettings = reduxForm({
  form: 'DocumentSettings',
})(DocumentSettings);

export default DocumentSettings;
