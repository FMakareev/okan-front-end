import React from 'react';
import get from "lodash/get";

export class RegistryFactory {
  constructor(registry = {}) {
    this._registry = registry;
  }

  //get a component by id, if not available we return null
  getComponent = id => get(this._registry, `components.${id}`, null);
}

export const RegistrySwitch = ({registry, type, ...rest}) => {
  const Component = registry.getComponent(type);
  return Component ? <Component {...rest}/> : null;
};

export default {
  RegistryFactory,
  RegistrySwitch
};
