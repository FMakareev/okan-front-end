import React, {Component, Fragment} from 'react';
import {Absolute} from 'rebass';
import PropTypes from 'prop-types';
import { graphql, Query, withApollo } from 'react-apollo';

/** Image */
import {SvgSidebarAdd} from '../../../../components/Icons/SvgSidebarAdd';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';

/** Components */
import EditorAdditionalMenuButtonTable from './EditorAdditionalMenuButtonTable';
import EditorAdditionalMenuButtonImage from './EditorAdditionalMenuButtonImage';
import EditorAdditionalMenuButtonText from './EditorAdditionalMenuButtonText';

/** Graphql schema */
import CreateCellMutation from '../SidebarCreateCell/CreateCellMutation.graphql';
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';

/** New block types */
import {BLOCK_TABLE, BLOCK_IMAGE, BLOCK_TEXT} from '../../../../shared/blockType'

/** HOC */
import RenderOpenWindow from '../../../../utils/helpers/RenderOpenWindow';

const EditorAdditionalMenuButton = (props) => {
  return (
    <Absolute className={'EditorAdditionalMenuButton'} left={'30px'} top={'0%'}>
      <Flex mx={-2}>
        <Box mx={2}>
          <EditorAdditionalMenuButtonTable {...props}/>
        </Box>
        <Box mx={2}>
          <EditorAdditionalMenuButtonImage {...props}/>
        </Box>
        <Box mx={2}>
          <EditorAdditionalMenuButtonText {...props}/>
        </Box>
      </Flex>
    </Absolute>
  )
};

/**
 * @desc Компонент контроллер для добавления новых блоков в документ
 * */
export class EditorAdditionalMenu extends Component {
  static propTypes = {
    /** func submit for Form */
    handleClick: PropTypes.func,
    /** open window */
    isOpen: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    if (isBrowser) {
      this.app = document.getElementById('app');
    }
  }

  get initialState() {
    return {
      active: false,
    }
  }

  componentWillUnmount() {
    if (isBrowser) {
      document.removeEventListener('click', this.eventHandle, false);
    }
  }

  componentWillMount() {
    if (isBrowser) {
      document.addEventListener('click', this.eventHandle, false);
    }
  }

  /**
   * @param {array} path - массив объекто дом элементов начиная от того на котором сработало событие и до корня документа
   * @param {string} className - название класса который
   * @desc метод ищет в массиве класс и возвращает его индекс.
   * */
  findClassInPath = (path, className) => {
    try {
      return path.findIndex(item => item.className && item.className.indexOf(className) >= 0)
    } catch (error) {
      return null;
    }
  };

  /**
   * @desc метод является callback обработчиком для прослушивания дом
   * */
  eventHandle = (event) => {
    try {
      if (Array.isArray(event.path)) {
        if (this.findClassInPath(event.path, `EditorAdditionalMenuButton`) >= 0 ) {
          return null;
        } else {
          if(this.state.active){
            return this.toggleMenu();
          }
          return null
        }
      }
    } catch (error) {
      console.log('Error eventHandle: ', error);
    }
  };

  /**
   * @desc переключатель состояния списка вкл/выкл
   * */
  toggleMenu = () => {
    this.setState((state) => ({
      ...state,
      active: !state.active,
    }))
  };

  getLastCellId = (blockType) => {
    this.props.client.query({ 
      query: CellListQuery,
      variables: {
        parent: this.props.sectionid
      }
    }).then(({ data }) => {
      let lastCellId = data.celllist[data.celllist.length - 1].id;
      this.createEditorInstance(blockType, lastCellId)
    }).catch((error) => {
      this.createEditorInstance(blockType, null)
      console.log('there was an error sending the query', error);
    });
  }

  createEditorInstance = (blockType, lastCellId) => {
    let prevcell = lastCellId ? lastCellId : this.props.sectionid;
    this.props.mutate({
      variables: { 
        name: '',
        prevcell: prevcell, 
        parent: this.props.sectionid, 
        isHead: false, 
        contenttype: blockType,
        content: 'Новый блок'
      },
      update: (store, { data: { createcell } }) => {
        const data = store.readQuery({ 
          query: CellListQuery,
          variables: {
            parent: this.props.sectionid
          }
        });
 
        data.celllist.push(createcell.cell);

        store.writeQuery({
          query: CellListQuery,
          variables: {
            parent: this.props.sectionid
          },
          data
        })
      }
    })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {

    const {active} = this.state;

    return (
      <Box position={'relative'}>
        <ButtonBase variant={'empty'} onClick={this.toggleMenu}>
          <SvgSidebarAdd/>
        </ButtonBase>
        {active && <EditorAdditionalMenuButton handleButtonPress={(blockType)=>{this.getLastCellId(blockType)}}/>}
      </Box>
    );
  }
}

EditorAdditionalMenu = withApollo(EditorAdditionalMenu);

EditorAdditionalMenu = graphql(CreateCellMutation)(EditorAdditionalMenu);

export default RenderOpenWindow(EditorAdditionalMenu);
