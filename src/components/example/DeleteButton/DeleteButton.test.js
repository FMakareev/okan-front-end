import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import { DeleteButton, DELETE_PRODUCT_MUTATION } from './DeleteButton';

it('Рендерится без ошибок', () => {
  renderer.create(
    <MockedProvider mocks={[]}>
      <DeleteButton />
    </MockedProvider>,
  );
});

it('Должен быть в состоянии загрузки', () => {
  const deleteProduct = { name: 'Buck', breed: 'Poodle', id: 1 };
  const mocks = [
    {
      request: {
        query: DELETE_PRODUCT_MUTATION,
        variables: { name: 'Buck' },
      },
      result: { data: { deleteProduct } },
    },
  ];

  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <DeleteButton />
    </MockedProvider>,
  );

  // найти кнопку и имитировать клик
  const button = component.root.findByType('button');
  button.props.onClick(); //срабатывает мутация

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Проверка визуализации после удоления.', async () => {
  const deleteProduct = { name: 'Buck', breed: 'Poodle', id: 1 };
  const mocks = [
    {
      request: {
        query: DELETE_PRODUCT_MUTATION,
        variables: { name: 'Buck' },
      },
      result: { data: { deleteProduct } },
    },
  ];

  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <DeleteButton />
    </MockedProvider>,
  );

  // найти кнопку и имитировать клик
  const button = component.root.findByType('button');
  button.props.onClick(); //срабатывает мутация

  await wait(0);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Проверка рендера при ошибке", async () => {
  const mocks = [
    {
      request: {
        query: DELETE_PRODUCT_MUTATION,
        variables: { name: 'Buck' },
      },
      result: { errors: [{ message: "boi" }] }
    }
  ];

  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <DeleteButton />
    </MockedProvider>
  );

  // найти кнопку и имитировать клик
  const button = component.root.findByType('button');
  button.props.onClick(); //срабатывает мутация

  await wait(0);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
