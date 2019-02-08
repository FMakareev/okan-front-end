'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';
import styled from 'styled-components';

import NodeHeader from './NodeHeader';

const Ul = styled.ul`
  position: relative;
`;

export class TreeNode extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {node, onToggle} = this.props;
    const {toggled} = node;

    if (onToggle) {
      onToggle(node, !toggled);
    }
  }

  animations() {
    const {animations, node} = this.props;

    if (animations === false) {
      return false;
    }

    const anim = Object.assign({}, animations, node.animations);
    return {
      toggle: anim.toggle(this.props),
      drawer: anim.drawer(this.props)
    };
  }

  /**
   * @desc метод для переопределения декораторов на уровне узла
   * */
  decorators() {
    // Merge Any Node Based Decorators Into The Pack
    const {decorators, node} = this.props;
    let nodeDecorators = node.decorators || {};

    return Object.assign({}, decorators, nodeDecorators);
  }

  renderDrawer(decorators, animations) {
    const {node: {toggled}} = this.props;

    if (!animations && !toggled) {
      return null;
    } else if (!animations && toggled) {
      return this.renderChildren(decorators, animations);
    }

    const {animation, duration, ...restAnimationInfo} = animations.drawer;
    return (
      <VelocityTransitionGroup
        {...restAnimationInfo}
      >
        {toggled ? this.renderChildren(decorators, animations) : null}
      </VelocityTransitionGroup>
    );
  }

  renderHeader(decorators, animations) {
    const {node} = this.props;

    return (
      <NodeHeader
        animations={animations}
        decorators={decorators}
        node={Object.assign({}, node)}
        onClick={this.onClick}
      />
    );
  }

  renderChildren(decorators) {
    const {animations, decorators: propDecorators, node} = this.props;
    if (node.loading) {
      return this.renderLoading(decorators);
    }

    let children = node.children;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }

    return (
      <propDecorators.TreeNodeList
        ref={ref => this.subtreeRef = ref}>
        {
          children.map((child, index) => {
            child.number = `${node.number}${index+1}.`;
            return (<TreeNode
              {...this._eventBubbles()}
              animations={animations}
              decorators={propDecorators}
              key={child.id || index}
              node={child}
            />)
          })
        }
      </propDecorators.TreeNodeList>
    );
  }

  renderLoading(decorators) {
    return (
      <decorators.TreeNodeList>
        <decorators.Loading/>
      </decorators.TreeNodeList>
    );
  }

  _eventBubbles() {
    const {onToggle} = this.props;

    return {
      onToggle
    };
  }

  render() {
    const decorators = this.decorators();
    const animations = this.animations();

    return (
      <decorators.TreeNodeContainer>
        {this.renderHeader(decorators, animations)}

        {this.renderDrawer(decorators, animations)}
      </decorators.TreeNodeContainer>
    );
  }

}

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  decorators: PropTypes.object.isRequired,
  animations: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]).isRequired,
  onToggle: PropTypes.func
};

export default TreeNode;
