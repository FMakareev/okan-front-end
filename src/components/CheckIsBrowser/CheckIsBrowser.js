import React from 'react';

export let CheckIsBrowser = () => WrappedComponent => {
  return props => {
    if (isBrowser) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default CheckIsBrowser;
