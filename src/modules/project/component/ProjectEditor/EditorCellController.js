import React, {Component} from 'react';
import PropTypes from 'prop-types';

/** Components */
import EditorCellContent from './EditorCellContent';
import EditorCellForm from './EditorCellForm';

/** View */
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import {Flex} from "@lib/ui/Flex/Flex";
import EditorCellCommentController from "./EditorCellCommentController";

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


  render() {
    const {editable} = this.state;
    const {data} = this.props;
    console.log('EditorCellController: ',this.props);
    return (
      <Flex pl={'10px'} mt={12}>
        <Text width={'60px'} fontFamily={'secondary'} lineHeight={8} fontSize={6} color={'color4'}>
          2.1.
        </Text>
        <Box width={'calc(100% - 80px)'}>
          {
            !editable &&
            <EditorCellContent>
              orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </EditorCellContent>
          }
          {
            editable && <EditorCellForm/>
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
