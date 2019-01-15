import React, { Component, Fragment } from 'react';
// import tree from '../../../../../test';
import {Treebeard } from '../../../../components/ReactTreeBeard';

/** View */
import Box from '../../../../components/Box/Box';

/** Components */
import SidebarCellRoot from './SidebarCellRoot';
import EditorCellCommentButton from './EditorCellCommentButton';
import EditorCellController from './EditorCellController';
import EditorCellCommentController from './EditorCellCommentController';
import SidebarCellNode from './SidebarCellNode';

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
        data={[data,data]}
        onToggle={this.onToggle}
      />
      <Box pl={3} my={4}>
        <SidebarCellRoot nameSection={'I. ТЗ - RK-186-344'} />
      </Box>
      <Box pl={3} my={9}>
        <SidebarCellNode />
      </Box>

      <EditorCellController />

      <EditorCellCommentController />
    </div>
  }
}

export default ProjectEditorSideBar;
