import React from 'react';
// TODO review:nik-z: первое: это должна быть константа и называтся так же как файл с большой буквы
// TODO review:nik-z: второе: должен быть обычный экспорт (export const ...) и экспорт по умолчанию
// TODO review:nik-z: третье: внутри у тебя обычный jsx и в jsx аргументы не пишутся через "-", а пишутся в camalCase т.к. в js нельзя создавать переменные или свойства (за исключением свойств строкой) с дефисом
export default () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24">
      <circle cx="12" cy="12" r="12" fill="inherit" />
    </mask>
    <g mask="url(#mask0)">
      <ellipse cx="12" cy="23" rx="12" ry="9" fill="inherit" />
      <circle cx="12" cy="8" r="6.5" fill="inherit" stroke="#007FAF" strokeWidth="3" />
    </g>
  </svg>
);
