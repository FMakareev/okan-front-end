import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**View */
import { Text } from '../Text/Text';

/**
 * Компонента сообщения
 * @example ./Message.example.md
 */

export class Message extends Component {
  static propTypes = {
    /** Description of prop "px: padding-left and padding-right". */
    px: PropTypes.number,
    /** Description of prop "px: padding-top and padding-bottom". */
    py: PropTypes.number,
    /** Description of prop "py: padding-top and padding-bottom". */
    mt: PropTypes.number,
    /** Description of font sizes */
    fontSize: PropTypes.number,
    /** Description of proline-height. */
    lineHeight: PropTypes.number,
    /** Description of description. */
    description: PropTypes.string,
    /** Description of error. */
    error: PropTypes.string,
    /** Description of warning. */
    warning: PropTypes.bool,
    /** Description of touched. */
    touched: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { description, meta } = this.props;

    return (
      <Fragment>
        {description && <Text {...this.props}>{description}</Text>}
        {meta && meta.touched && meta.error && (
          <Text {...this.props} fontFamily={'primary500'}>
            {meta.error}
          </Text>
        )}
        {meta && meta.touched && meta.warning && (
          <Text {...this.props} fontFamily={'primary500'}>
            {meta.warning}
          </Text>
        )}
      </Fragment>
    );
  }
}

export default Message;
