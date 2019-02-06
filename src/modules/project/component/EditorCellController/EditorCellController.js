import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHTMLParser from 'react-html-parser';
import { graphql } from 'react-apollo';

/** Components */
import EditorCellForm from '../EditorCellForm/EditorCellForm';

/** View */
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import { Flex } from '@lib/ui/Flex/Flex';
import EditorCellCommentController from '../EditorCellCommentController/EditorCellCommentController';

/** Redux */
import { connect } from 'react-redux';

/** Mutation */
import UpdateCellMutation from './UpdateCellMutation.graphql';

let timer

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

  // componentDidMount() {
  //   console.log('mount')
  // }

  // componentDidUpdate() {
  //   if(this.state.editable) {
  //     var timer = setInterval(() => {
  //       this.saveCellContent(); 
  //     }, 10000);
  //   }
  // };

  formDidMount = () => {
    timer = setInterval(() => {
      this.saveCellContent(); 
    }, 30000);
  }

  saveCellContent() {
    // console.log(this.props.values.content)
    this.props
      .mutate({
        variables: {
          id: this.props.data.id,
          content: this.props.values.content,
        },
      })
      .then(({ data }) => {
        console.log('got data', data);
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }

  onBlur = () => {
    if (this.props.values.content) {
      clearInterval(timer);
      this.saveCellContent();
      this.setState(state => ({
        ...state,
        editable: !state.editable,
      }));
    }
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
              form={'EditorCellForm-' + data.id}
              initialValues={{
                content: data.content.content,
                contenttype: data.content.contenttype,
              }}
              id={data.id}
              data={data}
              didMount={()=>this.formDidMount()}
              onBlur={()=>this.onBlur()}
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

const mapStateToProps = (state, props) => {
  let id = props.data.id
  return state.form['EditorCellForm-' + id];
};

EditorCellController = graphql(UpdateCellMutation)(EditorCellController);

export default connect(mapStateToProps)(EditorCellController);
