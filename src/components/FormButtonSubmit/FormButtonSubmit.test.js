import React from 'react';
import renderer from 'react-test-renderer';
// import 'jest-styled-components'; // этот импорт нужен чтобы в снэпшоты попали css стили которые генерируются при рендере компонента

import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { FormButtonSubmit } from './FormButtonSubmit';

test('FormButtonSubmit: Рендерится без ошибок', () => {
  const output = renderer
    .create(
      <StyledThemeProvider>
        <FormButtonSubmit children={'Button'} />
      </StyledThemeProvider>,
    )
    .toJSON();
  expect(output).toMatchSnapshot();
});

test('FormButtonSubmit: Рендерится прелоадер если isLoading true', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <FormButtonSubmit children={'Button'} isLoading />
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});

// test('FormButtonSubmit: Рендерится с иконкой слева', () => {
//   const output = renderer.create(
//     <StyledThemeProvider>
//       <FormButtonSubmit children={'Button'} variant={'large'} size={'large'} />
//     </StyledThemeProvider>,
//   );
//   expect(output).toMatchSnapshot();
// });
