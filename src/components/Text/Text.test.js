import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from "../../styles/StyledThemeProvider";
import { Text } from "./Text";

it('Text: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider >
      <Text />
    </StyledThemeProvider>,
  );
});
