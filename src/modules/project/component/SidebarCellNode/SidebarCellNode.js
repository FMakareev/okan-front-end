import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import { graphql, Query } from 'react-apollo';
import Notifications, { success, error } from 'react-notification-system-redux';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/** Components */
import SidebarCreateCell from '../SidebarCreateCell/SidebarCreateCell';
import SidebarApprovalStatus from '../SidebarApprovalStatus/SidebarApprovalStatus';
import SidebarChangeCell from '../SidebarChangeCell/SidebarChangeCell';
import NodeToggle from '../NodeToggle/NodeToggle';
import { SidebarCellNodeEditable } from '../SidebarCellNodeEditable/SidebarCellNodeEditable';
import { getPosition } from '../ProjectContext/ProjectContextSelectors';

/** Graphql schema */
import CellMarkerQuery from './CellMarkerQuery.graphql';

/** Graphql schema */
import BindingCellMutation from './BindingCellMutation.graphql';

/** Redux action to remove BlockId from store */
import { removeBlockId } from '../../../../store/reducers/blocksBinding/actions';

const has = Object.prototype.hasOwnProperty;

const Wrapper = styled(Flex)`
  cursor: pointer;
`;

const notificationOpts = (cellText) => ({
  success: {
    title: 'Блок привязан',
    message: 'Вы привязали блок к разделу ' + cellText,
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Ошибка',
    message: 'Не удалось привязать блок',
    position: 'tr',
    autoDismiss: 2,
  },
});

// TODO: добавить авто сохранение каждые 30 секунд если поле с именем в фокусе
// TODO: добавить вывод актуального статуса

export class SidebarCellNode extends Component {
  static propTypes = {
    addNodeInTree: PropTypes.func.isRequired,
    position: PropTypes.shape({
      cellid: PropTypes.string,
      sectionid: PropTypes.string,
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
      loading: PropTypes.bool,
    }),
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
        hover: false,
      };
    } catch (e) {
      console.error(e);
    }
  }
  componentDidUpdate() {
    console.log('props after update', this.props)
  }

  handleChange = evt => {
    this.setState({ name: evt.target.value });
  };

  onToggleEditable = () => {
    const { changeNodeFocus, node } = this.props;
    console.log('onToggleEditable: ', this.props);
    if (node.focused) {
      this.contentEditable.current.focus();
    }
    changeNodeFocus(node.id, !node.focused);
    this.setState(() => ({ focused: !node.focused }));
  };

  getNumberFromContent = node =>
    has.call(node, 'content') && has.call(node.content, 'number') && node.content.number;

  static childcellIsCategory = (cell) => {
    try{
      if(has.call(cell, 'childcell')){
        if(cell.childcell.isHead){
          return true
        } else {
          return false;
        }
      } else {
        return false;
      }

    }catch(error){
      console.error('Error cellIsHead: ',cell,error);
      return false;
    }
  };

  handleClick = () => {
    try {
      const {onClick, node, history, project, document, bindingBlockId} = this.props;

      const isHead = SidebarCellNode.childcellIsCategory(node);

      if (isHead) {
        onClick();
      } else {
        if(bindingBlockId) {
          this.bindBlock(node.id, bindingBlockId);
        } else {
          history.push(`/app/project/${getPosition(project, 'projectid')}/${document.id}/${node.id}`);
        }
      }
    } catch (error) {
      console.log(`Error node=${node.id}: `, error);
    }
  };

  onHover = hover => {
    this.setState(state => ({
      ...state,
      hover: hover,
    }));
  };

  bindBlock = (parent, target) => {
    this.props.mutate({
      variables: {
        target: target,
        parent: parent
      }
    })
      .then(({ data }) => {
        console.log('got data', data);
        this.props.setNotificationSuccess(notificationOpts(this.props.node.name).success);
        this.props.removeBlockId();
      }).catch((error) => {
        console.log('there was an error sending the query', error);
        this.props.setNotificationError(notificationOpts(null).error);
      });
  }

  render() {
    const {decorators, terminal, onClick, node} = this.props;
    const { hover, name } = this.state;
    const isHead = SidebarCellNode.childcellIsCategory(node);
    return (
      <Wrapper
        onMouseEnter={() => this.onHover(true)}
        onMouseLeave={() => this.onHover(false)}
        mb={'10px'}
        px={'10px'}
        onClick={this.handleClick}
        justifyContent={'flex-start'}
        alignItems={'center'}>
        <Flex width={'calc(100% - 72px)'}>
          {isHead && <NodeToggle toggled={node.toggled} />}
          <Flex ml={isHead ? '' : '20px'} color={'color11'} width={'calc(100% - 28px)'}>
            <Text fontWeight={isHead ? 500 : 300} color={'color11'}>
              {node.number}
            </Text>
            <Text fontWeight={isHead ? 500 : 300} color={'color11'} mr={1}>
              <SidebarCellNodeEditable
                id={node.id}
                onToggle={this.onToggleEditable}
                ref={this.contentEditable}
                html={name}
                focused={node.focused}
                onChange={this.handleChange}
              />
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Box opacity={hover ? '1' : '0'} px={1}>
            <SidebarChangeCell onClick={this.onToggleEditable} />
          </Box>
          <Box opacity={hover ? '1' : '0'} px={1}>
            <SidebarCreateCell
              prevcell={node.id}
              parent={node.parent? node.parent.id: null}
              addNodeInTree={this.props.addNodeInTree}
              changeNodeFocus={this.props.changeNodeFocus}
            />
          </Box>
          <Box px={1}>
            <Query query={CellMarkerQuery} variables={{ id: node && node.id }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return 'Загрузка...';
                }
                if (error) {
                  return 'Произошла ошибка.';
                }
                // if (!data || (data && !has.call(data, 'cellMarker'))) {
                //   return null;
                // }
                return <SidebarApprovalStatus data={data && data.cellMarker} />;
              }}
            </Query>
          </Box>
        </Flex>
      </Wrapper>
    );
  }
}

SidebarCellNode = withRouter(SidebarCellNode);

const mapStateToProps = state => {
  return state.blocksBinding;
};

SidebarCellNode = graphql(BindingCellMutation)(SidebarCellNode);

export default connect(
  mapStateToProps, 
  dispatch => ({ 
    removeBlockId: () => dispatch(removeBlockId()),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  })
)(SidebarCellNode);
