import React, {Component} from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils'

import { Provider as ProviderRedux } from 'react-redux';

import SimpleForm, {RenderField} from './SimpleForm';
import {Store} from "../../../store";


test('SimpleForm: просто рендер', () => {
  const output = renderer.create(
    <ProviderRedux store={Store}>
      <SimpleForm/>
    </ProviderRedux>
  ).toJSON();
  expect(output).toMatchSnapshot();
});

test('SimpleForm: onSubmit должен вызватся 1 раз', () => {
  const spy = jest.fn();

  const wrapper  =  renderer.create(
    <ProviderRedux store={Store}>
      <SimpleForm
        handleSubmit={spy}
      />
    </ProviderRedux>
  );
  const tree = wrapper.toJSON();
  tree.props.onSubmit();

  expect(spy).toHaveBeenCalledTimes(1);
});
test('SimpleForm: проверка инифиализации формы с данными', () => {
  const initialValues = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'email@email.com',
    sex: 'male',
  };
  const wrapper = renderer.create(
    <ProviderRedux store={Store}>
      <SimpleForm
        initialValues={initialValues}
      />
    </ProviderRedux>
  );

  // сравниваем то что находится в redux с тем что мы передали
  expect(Store.getState().form.simple.values).toEqual(initialValues);
});
test('SimpleForm: проверка инифиализации формы с данными', () => {
  const initialValues = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'email@email.com',
    sex: 'male',
  };
  const wrapper = renderer.create(
    <ProviderRedux store={Store}>
      <SimpleForm
        initialValues={initialValues}
      />
    </ProviderRedux>
  );

  // сравниваем то что находится в redux с тем что мы передали
  expect(Store.getState().form.simple.values).toEqual(initialValues);
});

test('SimpleForm: вызов onChange на компоненте и name = firstName', () => {
  const initialValues = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'email@email.com',
    sex: 'male',
  };
  const dom = ReactTestUtils.renderIntoDocument(
    <ProviderRedux store={Store}>
      <SimpleForm
        initialValues={initialValues}
      />
    </ProviderRedux>
  );
  // https://reactjs.org/docs/test-utils.html#findrenderedcomponentwithtype
  let props = ReactTestUtils.findRenderedComponentWithType(dom, RenderField).props;
  props.input.onChange('Bla bla bla');
  props = ReactTestUtils.findRenderedComponentWithType(dom, RenderField).props;
  expect(props.input.value).toBe('Bla bla bla');
});


// https://github.com/erikras/redux-form/blob/master/src/__tests__/Form.spec.js
