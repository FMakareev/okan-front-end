import React from 'react';

export const GraphQLError = error => {
  switch (error.message) {
    case 'GraphQL error: User not logged': {
      return {
        message: 'error_user_not_logged',
        redirect: '/logout',
      };
    }
    case 'GraphQL error: User session not found': {
      return {
        message: 'error_user_session_not_found_title',
        redirect: '/logout',
      };
    }
    case 'GraphQL error: You not accessed': {
      return {
        title: 'error_access_denied_title',
        message: 'error_access_denied_message',
      };
    }
    case 'GraphQL error: not found': {
      return { title: 'error_page_not_found_title', message: 'error_page_not_found_title' };
      // (
      //   // <span>
      //   //   {error.params.name} {'error_page_not_found_message'}
      //   // </span>
      // ),
    }
    default:
      return {
        title: 'error_unexpected_error_title',
      };
  }
};

export default GraphQLError;
