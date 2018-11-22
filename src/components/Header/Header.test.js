import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';

it('Header: Рендерится без ошибок', () => {
  renderer.create(<Header />);
});
