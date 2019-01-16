import React from 'react';
import PropTypes from "prop-types";
import {Base, Title} from "@lib/ui/ReactTreeBeard/decorators/Header/HeaderStyled";

export const Header = ({node}) => {
  return (
    <Base>
      <Title>
        {node.name}
      </Title>
    </Base>
  );
};
Header.propTypes = {
  node: PropTypes.object.isRequired
};

export default Header;
