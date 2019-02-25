import React from 'react';
import { Helmet } from 'react-helmet';

export const Head = ({ name }) => (
  <Helmet>
    <title>ОКАН: {name}</title>
  </Helmet>
);

export default Head;
