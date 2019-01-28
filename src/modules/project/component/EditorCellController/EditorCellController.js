import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactHTMLParser from 'react-html-parser';
/** Components */
import EditorCellForm from '../EditorCellForm/EditorCellForm';

/** View */
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import {Flex} from "@lib/ui/Flex/Flex";
import EditorCellCommentController from "../EditorCellCommentController/EditorCellCommentController";

export class EditorCellController extends Component {

  static propTypes = {
    /** data for components */
    data: PropTypes.string,
  };

  static defaultProps = {data: ''};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      editable: false,
    }
  }

  /**
   * @desc метод для переключения в режим редактирования ячейки
   * */
  onToggleForm = () => {
    this.setState((state) => ({
      ...state,
      editable: !state.editable,
    }))
  };


  render() {
    const {editable} = this.state;
    const {data} = this.props;
    console.log('EditorCellController: ', this.props);
    return (
      <Flex pl={'10px'} mt={12}>
        <Text width={'60px'} fontFamily={'secondary'} lineHeight={8} fontSize={6} color={'color4'}>
          {data.content.number}
        </Text>
        <Box width={'calc(100% - 80px)'}>
          {
            !editable &&
            <Text onClick={this.onToggleForm} fontSize={5} lineHeight={6} color={'color11'} fontFamily={'primary300'}>
              {data.content && ReactHTMLParser(data.content.content)}
            </Text>
          }
          {
            editable && (<EditorCellForm
              form={'EditorCellForm-'+data.name}
              initialValues={{
                content: data.content.content,
                contenttype: data.content.contenttype,
              }}
            />)
          }
        </Box>
        <Box width={'20px'}>
          <EditorCellCommentController {...data}/>
        </Box>
      </Flex>
    );
  }
}

export default EditorCellController;
