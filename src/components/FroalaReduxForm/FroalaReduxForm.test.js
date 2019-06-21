import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import ReactFroala from 'react-froala-wysiwyg';
import {FroalaReduxForm} from "./FroalaReduxForm.js";
import {DefineIcons} from "@lib/ui/FroalaReduxForm/DefineIcons";
import renderer from 'react-test-renderer';
import {
  wait,
} from '@testing-library/react'

/** Предустановка */
const FroalaEditor = require('froala-editor/js/froala_editor.pkgd.min.js');
const $ = require('jquery');

FroalaEditor();
Object.defineProperty(window, '$', {value: $});
Object.defineProperty(global, '$', {value: $});
Object.defineProperty(global, 'jQuery', {value: $});



it('FroalaReduxForm: renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FroalaReduxForm/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('FroalaReduxForm: find DefineIcons component', async () => {

  const wrapper = shallow(<FroalaReduxForm />);

  await wait(()=>{},{
    timeout: 2000
  });

  expect(wrapper.find(DefineIcons)).toHaveLength(1);
});


