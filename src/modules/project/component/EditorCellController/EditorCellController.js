import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHTMLParser from 'react-html-parser';
/** Components */
import EditorCellForm from '../EditorCellForm/EditorCellForm';

/** View */
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import { Flex } from '@lib/ui/Flex/Flex';
import EditorCellCommentController from '../EditorCellCommentController/EditorCellCommentController';

export class EditorCellController extends Component {
  static propTypes = {
    /** data for components */
    data: PropTypes.string,
  };

  static defaultProps = { data: '' };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      editable: this.props.editable,
      // draggable: false,
    };
  }

  /**
   * @desc метод для переключения в режим редактирования ячейки
   * */
  onToggleForm = () => {
    this.setState(state => ({
      ...state,
      editable: !state.editable,
    }));
  };

  componentDidMount() {
    if(this.state.editable) {
      var timer = setInterval(() => {
        this.saveCellContent();
      }, 30000);
    }
  }

  componentDidUpdate() {
    if(this.state.editable) {
      var timer = setInterval(() => {
        this.saveCellContent();
      }, 30000);
    }
  };

  saveCellContent() {

  }

  // onHover() {
  //   let bindingButton = document.querySelector('.fr-btn[id|="bind"]')

  //   if(bindingButton) {
  //     bindingButton.onmouseenter = (e) => {
  //       this.startBinding()
  //     }
  //     bindingButton.onmouseleave = () => {
  //       this.toggleDraggable()
  //     }
  //     bindingButton.onmousedown = () => {
  //       this.onDragBlock
  //     }
  //   }
  // }

  // async startBinding() {
  //   await this.toggleDraggable();
  // }

  // toggleDraggable = () => {
  //   this.setState((state) => ({
  //     ...state,
  //     draggable: !state.draggable,
  //   }))
  //   // this.onDrag = () => {
  //   //   console.log('dragging')
  //   // }
  // }

  // onDragBlock = (event) => {
  //   console.log(event)
  // }

  render() {
    const { editable } = this.state;
    const { data } = this.props;
    // console.log('EditorCellController: ', this.props);
    return (
      <Flex
        pl={'10px'}
        mt={12}
        // onMouseOver={()=>this.onHover()}
        // // draggable={this.state.draggable}
        // // onClick={(event)=>{console.log('clicked', event.isPropagationStopped)}}
        // draggable="true"
        // draggable
        // onDrag={(event)=>this.onDragBlock(event)}
        // ondragstart={(event)=>this.onDragBlock(event)}
      >
        <Text width={'60px'} fontFamily={'secondary'} lineHeight={8} fontSize={6} color={'color4'}>
          {data.content.number}
        </Text>
        <Box width={'calc(100% - 80px)'}>
          {!editable && (
            <Text
              onClick={this.onToggleForm}
              fontSize={5}
              lineHeight={6}
              color={'color11'}
              fontFamily={'primary300'}>
              {data.content && ReactHTMLParser(data.content.content)}
            </Text>
          )}
          {editable && (
            <EditorCellForm
              form={'EditorCellForm-' + data.name}
              initialValues={{
                content: data.content.content,
                contenttype: data.content.contenttype,
              }}
              id={data.id}
              data={data}
            />
          )}
        </Box>
        <Box width={'20px'}>
          <EditorCellCommentController {...data} />
        </Box>
      </Flex>
    );
  }
}

export default EditorCellController;
