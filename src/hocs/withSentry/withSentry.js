import React from 'react';
import * as Sentry from "@sentry/browser";


export const captureException = (error) => {
  console.log(error);
  console.log(process.env.NODE_ENV );
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error);
  }
}

export const captureMessage = (message) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message);
  }
}

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
