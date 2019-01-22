import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/** Components */
import SidebarCreateCell from '../SidebarCreateCell/SidebarCreateCell';
import SidebarApprovalStatus from '../ProjectEditor/SidebarApprovalStatus';
import SidebarChangeCell from '../ProjectEditor/SidebarChangeCell';
import {SvgTriangle} from "@lib/ui/Icons/SvgTriangle";
import NodeToggle from "../NodeToggle/NodeToggle";
import {SidebarCellNodeEditable} from "../SidebarCellNodeEditable/SidebarCellNodeEditable";

const has = Object.prototype.hasOwnProperty;

const Wrapper = styled(Flex)`
 cursor: pointer;
`;

export class SidebarCellNode extends Component {
  static propTypes = {
    addNodeInTree: PropTypes.func.isRequired,
    params: PropTypes.shape({
      cellid: PropTypes.string,
      documentid: PropTypes.string,
      projectid: PropTypes.string,
    }),
    changeNodeFocus: PropTypes.func.isRequired,
    decorators: PropTypes.shape({
      Container: PropTypes.func.isRequired,
      Header: PropTypes.func.isRequired,
      Loading: PropTypes.func.isRequired,
      Toggle: PropTypes.func.isRequired,
      TreeBeardWrapper: PropTypes.func.isRequired,
      TreeNodeContainer: PropTypes.func.isRequired,
      TreeNodeList: PropTypes.func.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
    terminal: PropTypes.bool.isRequired,
    document: PropTypes.object.isRequired,
    children: PropTypes.any,
    node: PropTypes.shape({
      children: PropTypes.array,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      toggled: PropTypes.bool.isRequired,
      focused: PropTypes.bool.isRequired,
      active: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,
    })
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.contentEditable = React.createRef();
  }

  get initialState() {
    try {
      return {
        name: this.props.node.name,
        focused: this.props.node.focused,
      }
    } catch (e) {
      console.error(e);
    }
  }

  handleChange = evt => {
    this.setState({name: evt.target.value});
  };

  onToggleEditable = () => {
    const {changeNodeFocus, node} = this.props;
    console.log('onToggleEditable: ',this.props);
    if (node.focused) {
      this.contentEditable.current.focus();
    }
    changeNodeFocus(node.id, !node.focused);
    this.setState(() => ({focused: !node.focused}));
  };

  getNumberFromContent = (node) => has.call(node, 'content') && has.call(node.content, 'number') && node.content.number;

  getIsHeadStatus = (node) => node.is_head && node.childcell;

  handleClick = () => {
    try {
      const {onClick, node, history, params, document} = this.props;
      const isHead = this.getIsHeadStatus(node);

      if (isHead) {
        onClick()
      } else {
        const {projectid} = params;
        history.push(`/app/project/${projectid}/${document.id}/${node.id}`);
      }
    } catch (error) {
      console.log(`Error node=${node.id}: `, error);
    }
  };

  render() {
    const {decorators, terminal, onClick, node} = this.props;

    const isHead = this.getIsHeadStatus(node);
    return (
      <Wrapper mb={'10px'} px={'10px'} onClick={this.handleClick} justifyContent={'flex-start'} alignItems={'center'}>
        <Flex width={'calc(100% - 72px)'}>
          {isHead && <NodeToggle toggled={node.toggled}/>}
          <Flex ml={isHead ? '' : '20px'} color={'color11'} width={'calc(100% - 28px)'}>
            <Text fontWeight={isHead ? 500 : 300} color={'color11'}>
              {node.number}
            </Text>
            <Text fontWeight={isHead ? 500 : 300} color={'color11'} mr={1}>
              <SidebarCellNodeEditable
                id={node.id}
                onToggle={this.onToggleEditable}
                ref={this.contentEditable}
                html={this.state.name} // innerHTML of the editable div
                focused={node.focused} // use true to disable edition
                onChange={this.handleChange} // handle innerHTML change
              />
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Box px={1}>
            <SidebarChangeCell onClick={this.onToggleEditable}/>
          </Box>
          <Box px={1}>
            <SidebarCreateCell
              prevcell={node.id}
              parent={node.parent}
              addNodeInTree={this.props.addNodeInTree}
              changeNodeFocus={this.props.changeNodeFocus}
            />
          </Box>
          <Box px={1}>
            <SidebarApprovalStatus/>
          </Box>
        </Flex>
      </Wrapper>
    );
  }
}

SidebarCellNode = withRouter(SidebarCellNode);
export default SidebarCellNode;
