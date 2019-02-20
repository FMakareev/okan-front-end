import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import GraphQLError from './GraphQLError';
import RenderError from '../RenderError/RenderError';

/**
 * Компонент ошибки
 * @example ./ErrorCatch.example.md
 */
export class ErrorCatch extends Component {
  static propTypes = {
    /** Children component */
    children: PropTypes.element,
    /** notifications plugin: https://github.com/gor181/react-notification-system-redux */
    notifications: PropTypes.array,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
    this.findOfTheTypeError = this.findOfTheTypeError.bind(this);
  }

  componentDidCatch(error, info) {
    console.log(error, info);

    const Error = this.findOfTheTypeError(error);
    this.setState(() => ({
      error: Error,
      info,
    }));
  }

  findOfTheTypeError(error) {
    if (error.message.indexOf('GraphQL error: ') >= 0) {
      return GraphQLError(error, this.props.translate);
    }
    if (error.message.indexOf('Network error: Failed to fetch') >= 0) {
      return {
        message: 'Network error: Failed to fetch',
        redirect: '/500',
      };
    }
    return error;
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
    if (error) {
      if (error.redirect) {
        return <Redirect to={error.redirect} />;
      }
      return <RenderError {...error} />;
    }
    if (!children) {
      return null;
    }
    return children;
  }
}

export default ErrorCatch;
