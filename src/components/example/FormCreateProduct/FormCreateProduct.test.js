import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import { FormCreateProduct } from "./FormCreateProduct";


it('Рендерится без ошибок', () => {
  renderer.create(
    <MockedProvider mocks={[]}>
      <FormCreateProduct />
    </MockedProvider>,
  );
});
