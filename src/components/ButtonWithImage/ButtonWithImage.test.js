import React from 'react';
import renderer from 'react-test-renderer';
// import 'jest-styled-components'; // этот импорт нужен чтобы в снэпшоты попали css стили которые генерируются при рендере компонента
import Play from '../../assets/icons/monocolor/play.monocolor.svg';

import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { ButtonWithImage } from './ButtonWithImage';

test('ButtonWithImage: Рендерится без ошибок', () => {
  const output = renderer
    .create(
      <StyledThemeProvider>
        <ButtonWithImage children={'Button'} variant={'large'} size={'large'} />
      </StyledThemeProvider>,
    )
    .toJSON();
  expect(output).toMatchSnapshot();
});

test('ButtonWithImage: Рендерится с иконкой справа', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <ButtonWithImage rightIcon={<Play />} children={'Button'} variant={'large'} size={'large'} />
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});

test('ButtonWithImage: Рендерится с иконкой слева', () => {
  const output = renderer.create(
    <StyledThemeProvider>
      <ButtonWithImage leftIcon={<Play />} children={'Button'} variant={'large'} size={'large'} />
    </StyledThemeProvider>,
  );
  expect(output).toMatchSnapshot();
});
