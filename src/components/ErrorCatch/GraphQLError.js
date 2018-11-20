import React from 'react';

export const GraphQLError = (error, translate) => {
  switch (error.message) {
    case 'GraphQL error: User not logged': {
      return {
        message: translate('error_user_not_logged'),
        redirect: '/logout',
      };
    }
    case 'GraphQL error: User session not found': {
      return {
        message: translate('error_user_session_not_found_title'),
        redirect: '/logout',
      };
    }
    case 'GraphQL error: You not accessed': {
      return {
        title: translate('error_access_denied_title'),
        message: translate('error_access_denied_message'),
      };
    }
    case 'GraphQL error: not found': {
      return {
        title: translate('error_page_not_found_title'),
        message: (
          <span>
            {error.params.name} {translate('error_page_not_found_message')}
          </span>
        ),
      };
    }
    default:
      return {
        title: translate('error_unexpected_error_title'),
      };
  }
};

export default GraphQLError;
