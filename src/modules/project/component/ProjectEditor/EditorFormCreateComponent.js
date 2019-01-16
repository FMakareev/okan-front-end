import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form } from 'redux-form';
import styled from 'styled-components';

/** View */
import Image from '../../../../components/Image/Image';
import Flex from '../../../../components/Flex/Flex';

/** Components */
import EditorCellCommentButton from './EditorCellCommentButton';

/** HOC */
import RenderOpenWindow from '../../../../utils/helpers/RenderOpenWindow';

const FormStyled = styled(Form)`
  width: 100%;
`;

export let EditorFormCreateComponent = ({
  handleClick,
  isOpen,
  handleSubmit,
  image,
  nameField,
  component,
}) => {
  const RenderEditor = (
    <FormStyled onSubmit={handleSubmit}>
      <Flex ml={5} widht={'100%'}>
        <Field name={nameField} component={component} />
        <Flex mt={7}>
          <EditorCellCommentButton />
        </Flex>
      </Flex>
    </FormStyled>
  );

  return (
    <Flex>
      <Image src={image} onClick={handleClick} height={'30px'} />

      {isOpen && RenderEditor}
    </Flex>
  );
};

EditorFormCreateComponent.propTypes = {
  /** func submit for Component */
  handleClick: PropTypes.func,
  /** func submit for Form */
  handleSubmit: PropTypes.func,
  /** open window */
  isOpen: PropTypes.bool,
  /** name image */
  image: PropTypes.element,
  /** name Field */
  nameField: PropTypes.string,
  /** component for Field */
  component: PropTypes.element,
};

EditorFormCreateComponent.defaultProps = {
  handleClick: () => {},
  handleSubmit: () => {},
  isOpen: false,
  image: '',
  nameField: '',
};

EditorFormCreateComponent = reduxForm({
  form: 'EditorFormCreateComponent',
})(EditorFormCreateComponent);

export default RenderOpenWindow(EditorFormCreateComponent);
