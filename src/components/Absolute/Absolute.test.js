import React from 'react';
import Renderer from 'react-test-renderer';
import {Absolute} from './Absolute';


it('Absolute: рендер без ошибоку', () => {
  Renderer.create(<Absolute/>);
});
