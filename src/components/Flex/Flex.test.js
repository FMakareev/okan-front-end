import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from "../../styles/StyledThemeProvider";
import { Flex } from "./Flex";

it('Flex: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider >
      <Flex />
    </StyledThemeProvider>,
  );
});
