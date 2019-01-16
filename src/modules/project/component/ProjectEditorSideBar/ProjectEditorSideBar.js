import React, { Component } from 'react';
import {Treebeard, decorators } from '../../../../components/ReactTreeBeard/index';
import {Box} from "@lib/ui/Box/Box";
import SidebarCellRoot from "../ProjectEditor/SidebarCellRoot";
import SidebarCellNode from "../ProjectEditor/SidebarCellNode";

const data = {
  name: 'I. ТЗ - RK-186-344',
  toggled: false,
  id: 0,
  decorators: {
    ...decorators,
    Container: (props)=><SidebarCellRoot {...props}/>,
  },
  children: [
    {
      name: 'Введение',
      content: {
        number: '1',
      },
      children: [
        {
          name: 'Положение',
          content: {
            number: '1.1',
          },
        }
      ]
    }, {
      name: 'Технические требования',
      content: {
        number: '2',
      },
      children: [
        {
          name: 'Основные параметры и характеристики',
          content: {
            number: '2.1',
          },
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' }
          ],

        },{
          name: 'Требования к сырью, материалам, покупным изделиям',
          content: {
            number: '2.2',
          },
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' }
          ],
        },{
          name: 'Комплектность',
          content: {
            number: '2.3',
          },
          children: null,
        },
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

decorators.TreeBeardWrapper = (props) => <Box {...props}/>;

decorators.Container = (props) => <SidebarCellNode {...props}/>;

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
    </div>
  }
}

export default ProjectEditorSideBar;
