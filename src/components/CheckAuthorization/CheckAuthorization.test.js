import React from 'react';
import { Redirect } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';

import CheckAuthorization from './CheckAuthorization';

const ChildrenComponent = () => <div>Component</div>;

test('CheckAuthorization: объекта пользователя нет редирект на выход из приложения', () => {
  const ComponentConnect = CheckAuthorization()(ChildrenComponent);
  const wrapper = renderer.create(
    <MemoryRouter initialEntries={['/profile']}>
      <ComponentConnect />
    </MemoryRouter>,
  );
  expect(wrapper.root.findByType(Redirect).props.to).toBe('/');
});

test('CheckAuthorization: объекта пользователя содержит ошибку', () => {
  const ComponentConnect = CheckAuthorization()(ChildrenComponent);
  const wrapper = renderer.create(
    <MemoryRouter initialEntries={['/profile']}>
      <ComponentConnect
        user={{
          error: 'Error!',
          initLoading: false,
          updateLoading: false,
        }}
      />
    </MemoryRouter>,
  );
  expect(wrapper.root.findByType(Redirect).props.to).toBe('/');
});

test('CheckAuthorization: пользователь в состоянии загрузки в редакс', () => {
  const ComponentConnect = CheckAuthorization()(ChildrenComponent);
  const wrapper = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <ComponentConnect
        user={{
          error: null,
          initLoading: true,
          updateLoading: false,
        }}
      />
    </MemoryRouter>,
  );
  expect(wrapper.toJSON()).toBeNull();
});

test('CheckAuthorization: пользователь с валидной ролью, в ответ получаем компонент', () => {
  const Roles = ['Role1', 'Role2', 'Role3'];
  const ComponentConnect = CheckAuthorization(Roles)(ChildrenComponent);

  const wrapper = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <ComponentConnect
        user={{
          error: null,
          initLoading: false,
          updateLoading: false,
          role: 'Role1',
        }}
      />
    </MemoryRouter>,
  );
  expect(wrapper.toJSON().children[0]).toBe('Component');
});

test('CheckAuthorization: пользователь с не валидной ролью', () => {
  const Roles = ['Role1', 'Role2', 'Role3'];
  const AccessDeniedCallback = () => <div>AccessDeniedCallback</div>;

  const ComponentConnect = CheckAuthorization(Roles, <AccessDeniedCallback />)(
    AccessDeniedCallback,
  );

  const wrapper = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <ComponentConnect
        user={{
          error: null,
          initLoading: false,
          updateLoading: false,
          role: 'Role5',
        }}
      />
    </MemoryRouter>,
  );
  expect(wrapper.toJSON().children[0]).toBe('AccessDeniedCallback');
});
