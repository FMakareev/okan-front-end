import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from "../../styles/StyledThemeProvider";
import { Card } from "./Card";

it('Card: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider >
      <Card />
    </StyledThemeProvider>,
  );
});
