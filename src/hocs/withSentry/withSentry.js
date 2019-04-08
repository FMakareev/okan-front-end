import React from 'react';
import * as Sentry from "@sentry/browser";

/**
 * @desc метод для отправки объекта ошибки в sentry
 * */
export const captureException = (error, errorTitle = 'Error: ') => {
  console.error(errorTitle, error);
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error);
  }
};

/**
 * @desc метод для отправки обычного сообщения в sentry, как правило он не используется
 * */
export const captureMessage = (message) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message);
  }
};

/**
 * @desc
 * */
export let withSentry = WrappedComponent => {
  return props => {
    return <WrappedComponent
      captureException={captureException}
      captureMessage={captureMessage}
      {...props}
    />;
  };
};

export default withSentry;
