import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from "../../styles/StyledThemeProvider";
import { Box } from "./Box";

it('Box: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider >
      <Box />
    </StyledThemeProvider>,
  );
});
