'use strict';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';
import defaultDecorators from '../decorators';
import defaultAnimations from '../themes/animations';

export class TreeBeard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { animations, decorators, data: propsData, onToggle, style } = this.props;
    let data = propsData;

    /**
     * @desc Поддержка нескольких корневых узлов. Формально это не дерево, а сценарий использования.
     * */
    if (!Array.isArray(data)) {
      data = [data];
    }
    return (
      <decorators.TreeBeardWrapper>
        {data.map((node, index) => (
          <TreeNode
            animations={animations}
            decorators={decorators}
            key={node.id || index}
            node={node}
            onToggle={onToggle}
          />
        ))}
      </decorators.TreeBeardWrapper>
    );
  }
}

TreeBeard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onToggle: PropTypes.func,
  decorators: PropTypes.object,
};

TreeBeard.defaultProps = {
  animations: defaultAnimations,
  decorators: defaultDecorators,
};

export default TreeBeard;
