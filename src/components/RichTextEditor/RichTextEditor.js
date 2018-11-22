import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { space } from 'styled-system';

import Message from '../Message/Message';
import { FroalaReduxForm } from '../FroalaReduxForm/FroalaReduxForm';

const Wrapper = styled.div`
  ${space};
`;

/**
 * Компонент Rich Text Editor
 * @example ./RichTextEditor.example.md
 */

export class RichTextEditor extends Component {
  static propTypes = {
    /** class */
    className: PropTypes.string,
    /** CSS: margin-bottom */
    mb: PropTypes.number,
    /** input */
    input: PropTypes.object,
    /** input */
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    /** input */
    type: PropTypes.string,
    /** input */
    meta: PropTypes.object,
    /** input validation */
    required: PropTypes.string,
  };

  static defaultProps = {};

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.meta.active !== this.props.meta.active ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.input.value !== this.props.input.value ||
      nextProps.label !== this.props.label
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { className, mb, meta } = this.props;

    return (
      <Wrapper mb={mb} className={className}>
        <FroalaReduxForm {...this.props} />
        <Message meta={meta} />
      </Wrapper>
    );
  }
}

export default RichTextEditor;
