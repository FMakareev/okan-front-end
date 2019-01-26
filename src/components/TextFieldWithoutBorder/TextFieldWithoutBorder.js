import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** View */
import { TextFieldBase } from '../TextFieldBase/TextFieldBase';

/** PropTypes */
import { fieldInputPropTypes, fieldMetaPropTypes } from '../../propTypes/Forms/FormPropTypes';

const TextFieldStyled = styled(TextFieldBase)`
  border: 0;
  text-align: center;
`;
/**
 * Компонент инпута (Text Field)
 * @example ./TextField.example.md
 */

export class TextFieldWithoutBorder extends PureComponent {
  static propTypes = {
    /** input */
    ...fieldInputPropTypes,
    /** meta */
    ...fieldMetaPropTypes,
    /** class */
    className: PropTypes.string,
    /** class */
    classNameTextField: PropTypes.string,
    /** input */
    placeholder: PropTypes.string,
    /** input */
    required: PropTypes.string,
    /** input */
    type: PropTypes.string,
    /** input */
    disabled: PropTypes.bool,
  };

  static defaultProps = {};

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.meta.active !== this.props.meta.active ||
      nextProps.loading !== this.props.loading ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.input.value !== this.props.input.value ||
      nextProps.label !== this.props.label ||
      nextProps.type !== this.props.type
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { input } = this.props;

    return <TextFieldStyled {...this.props} {...input} />;
  }
}

export default TextFieldWithoutBorder;
