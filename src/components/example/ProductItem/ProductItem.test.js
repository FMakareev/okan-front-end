import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import { GET_PRODUCT_QUERY, ProductItem } from './ProductItem';

const mocks = [
  {
    request: {
      query: GET_PRODUCT_QUERY,
      variables: {
        name: 'Buck',
      },
    },
    result: {
      data: {
        product: {id: '1', name: 'Buck', breed: 'bulldog'},
      },
    },
  },
];

it('Рендерится без ошибок', () => {
  renderer.create(<MockedProvider mocks={mocks} addTypename={false}>
    <ProductItem name={"Buck"}/>
  </MockedProvider>);
});

it('Отображение состояния загрузки.', () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <ProductItem />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


it('Проверка рендера данных', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ProductItem name={"Buck"} />
    </MockedProvider>,
  );

  await wait(0); // небольшая задержка

  const tree= component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Проверка рендера ошибки.', async () => {
  const dogMock = {
    request: {
      query: GET_PRODUCT_QUERY,
      variables: { name: 'Buck' },
    },
    error: new Error('aw shucks'),
  };

  const component = renderer.create(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <ProductItem name="Buck" />
    </MockedProvider>,
  );

  await wait(0); // небольшая задержка

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
