import React, {Component} from 'react';
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import GraphQLError from './GraphQLError';
import ErrorView from '../ErrorView/ErrorView';

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

  static defaultProps = {
    error: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
    this.findOfTheTypeError = this.findOfTheTypeError.bind(this);
    if (this.props.error) {
      Sentry.withScope(scope => {
        Object.keys(this.props.error).forEach(key => {
          scope.setExtra(key, this.props.error[key]);
        });
        Sentry.captureException(this.props.error);
      });
      this.setState(() => ({
        error: this.props.error,
      }));
    }
  }


  componentDidCatch(error, errorInfo) {
    const Error = this.findOfTheTypeError(error);
    this.setState(() => ({
      error: Error,
      info: errorInfo,
    }));
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
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
    const {children} = this.props;
    const {error} = this.state;
    if (error) {
      if (error.redirect) {
        return <Redirect to={error.redirect}/>;
      }
      return <div>
        <ErrorView {...error} />
      </div>
    }
    if (!children) {
      return null;
    }
    return children;
  }
}

export default ErrorCatch;
