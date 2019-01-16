import React, {Component} from 'react';
import PropTypes from "prop-types";
import {VelocityComponent} from 'velocity-react';



export class Container extends Component {

  renderToggle() {
    const {animations} = this.props;

    if (!animations) {
      return this.renderToggleDecorator();
    }

    return (
      <VelocityComponent
        animation={animations.toggle.animation}
        duration={animations.toggle.duration}
      >
        {this.renderToggleDecorator()}
      </VelocityComponent>
    );
  }

  renderToggleDecorator() {
    const {decorators} = this.props;

    return <decorators.Toggle/>;
  }

  render() {
    const {decorators, terminal, onClick, node} = this.props;
    return (
      <div
        onClick={onClick}
      >
        {!terminal ? this.renderToggle() : null}

        <decorators.Header node={node}/>
      </div>
    );
  }
}

Container.propTypes = {
  decorators: PropTypes.object.isRequired,
  /** @desc есть ли дочерние ноды */
  terminal: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  animations: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]).isRequired,
  node: PropTypes.object.isRequired
};

export default Container
