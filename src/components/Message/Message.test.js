import React from 'react';
import renderer from 'react-test-renderer';
import { StyledThemeProvider } from "../../styles/StyledThemeProvider";
import { Message } from "./Message";

it('Message: Рендерится без ошибок', () => {
  renderer.create(
    <StyledThemeProvider >
      <Message />
    </StyledThemeProvider>,
  );
});
