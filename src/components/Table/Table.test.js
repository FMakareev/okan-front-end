import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from '../../styles/StyledThemeProvider';
import { Table } from './Table';
import { Tbody } from './Tbody';
import { Td } from './Td';
import { Tfoot } from './Tfoot';
import { Th } from './Th';
import { Thead } from './Thead';
import { Tr } from './Tr';

it('Table: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <Table />
    </StyledThemeProvider>,
  );
});

it('Tbody: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <Tbody />
    </StyledThemeProvider>,
  );
});

it('Td: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <Td />
    </StyledThemeProvider>,
  );
});

it('Tfoot: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <Tfoot />
    </StyledThemeProvider>,
  );
});

it('Th: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <Th />
    </StyledThemeProvider>,
  );
});

it('Thead: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <Thead />
    </StyledThemeProvider>,
  );
});

it('Tr: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider>
      <Tr />
    </StyledThemeProvider>,
  );
});
