import React from 'react';
import ReactDOM from 'react-dom';
import {RichTextEditor} from "./RichTextEditor.js";

it('RichTextEditor: renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RichTextEditor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
