
import React from 'react';
import ReactDOM from 'react-dom';
import {FroalaReduxForm} from "./FroalaReduxForm.js";

it('FroalaReduxForm: renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FroalaReduxForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
