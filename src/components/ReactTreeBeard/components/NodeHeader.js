'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';

class NodeHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    const props = this.props;
    const nextPropKeys = Object.keys(nextProps);

    for (let i = 0; i < nextPropKeys.length; i++) {
      const key = nextPropKeys[i];
      if (key === 'animations') {
        continue;
      }

      const isEqual = shallowEqual(props[key], nextProps[key]);
      if (!isEqual) {
        return true;
      }
    }

    return !deepEqual(props.animations, nextProps.animations, { strict: true });
  }

  render() {
    const { animations, decorators, node, onClick } = this.props;
    const { children } = node;
    const terminal = !children;
    // console.table(this.props);
    return (
      <decorators.Container
        animations={animations}
        decorators={decorators}
        node={node}
        onClick={onClick}
        terminal={terminal}
      />
    );
  }
}

NodeHeader.propTypes = {
  decorators: PropTypes.object.isRequired,
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  node: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default NodeHeader;
