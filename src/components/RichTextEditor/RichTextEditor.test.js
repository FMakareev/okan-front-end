import React from 'react';
import ReactDOM from 'react-dom';
import { RichTextEditor } from './RichTextEditor.js';
import { ApolloProvider } from 'react-apollo';

import mocksClient from '../../apollo/mocksClient';

it('RichTextEditor: renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={mocksClient}>
      <RichTextEditor />
    </ApolloProvider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
