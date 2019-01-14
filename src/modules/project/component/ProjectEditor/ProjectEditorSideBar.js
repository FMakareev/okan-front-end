import React, {Component} from 'react';
import tree from '../../../../../test';
import {Treebeard } from '../../../../components/ReactTreeBeard';

const data = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'loading parent',
      loading: true,
      children: []
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' }
          ]
        }
      ]
    }
  ]
};

export class ProjectEditorSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.onToggle = this.onToggle.bind(this);
  }

  get initialState(){
    return {};
  }

  onToggle(node, toggled){
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  render() {
    return <div>
      <Treebeard
        data={data}
        onToggle={this.onToggle}
      />
    </div>
  }
}

export default ProjectEditorSideBar;
