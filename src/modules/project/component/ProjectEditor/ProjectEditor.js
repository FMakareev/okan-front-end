import React, { Component } from 'react';

/** Components */

import DocumentTree from '../DocumentTree/DocumentTree';

/**View */
import Box from '../../../../components/Box/Box';

/**PropTypes */
import {Flex} from "@lib/ui/Flex/Flex";
import { DragDropContext } from 'react-dnd'

import HTML5Backend from 'react-dnd-html5-backend'
import EditorCellController from "./EditorCellController";
import SidebarCellNode from "../SidebarCellNode/SidebarCellNode";
import SidebarCellRoot from "../SidebarCellRoot/SidebarCellRoot";
import EditorAdditionalMenu from "./EditorAdditionalMenu";
import EditorCellComment from "./EditorCellComment";
import {EditorCellCommentButton} from "./EditorCellCommentButton";
import EditorAdditionalMenuButtonImage from "./EditorAdditionalMenuButtonImage";
import {EditorAdditionalMenuButtonTable} from "./EditorAdditionalMenuButtonTable";
import {EditorAdditionalMenuButtonText} from "./EditorAdditionalMenuButtonText";
import EditorCellCommentController from "./EditorCellCommentController";
import EditorCellCommentForm from "./EditorCellCommentForm";
import {EditorCellCommentList} from "./EditorCellCommentList";
import EditorCellContent from "./EditorCellContent";
import EditorCellForm from "./EditorCellForm";
import {SidebarApprovalStatus} from "../SidebarApprovalStatus/SidebarApprovalStatus";
import SidebarChangeCell from "../SidebarChangeCell/SidebarChangeCell";
import {SidebarCreateCell} from "../SidebarCreateCell/SidebarCreateCell";
import SidebarProjectExport from "../SidebarProjectExport/SidebarProjectExport";
import SidebarProjectSettings from "../SidebarProjectSettings/SidebarProjectSettings";
import SidebarRevisionList from "../SidebarRevisionList/SidebarRevisionList";
import SidebarSaveChanges from "../SidebarSaveChanges/SidebarSaveChanges";



export class ProjectEditor extends Component {
  static propTypes = {  };



  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {}

  render() {

    return (
      <Flex flexDirection={'row'}>
        <Box width={'320px'}>
          <DocumentTree />
        </Box>
        {/*<Box>*/}
          {/*EditorAdditionalMenu*/}
          {/*<EditorAdditionalMenu/>*/}
          {/*<br/>*/}

          {/*EditorAdditionalMenuButtonImage*/}
          {/*<EditorAdditionalMenuButtonImage/>*/}
          {/*<br/>*/}

          {/*EditorAdditionalMenuButtonTable*/}
          {/*<EditorAdditionalMenuButtonTable/>*/}
          {/*<br/>*/}

          {/*EditorAdditionalMenuButtonText*/}
          {/*<EditorAdditionalMenuButtonText/>*/}
          {/*<br/>*/}

          {/*EditorCellComment*/}
          {/*<EditorCellComment/>*/}
          {/*<br/>*/}

          {/*EditorCellCommentButton*/}
          {/*<EditorCellCommentButton/>*/}
          {/*<br/>*/}

          {/*EditorCellCommentController*/}
          {/*<EditorCellCommentController/>*/}
          {/*<br/>*/}

          {/*EditorCellCommentForm*/}
          {/*<EditorCellCommentForm/>*/}
          {/*<br/>*/}

          {/*EditorCellCommentList*/}
          {/*<EditorCellCommentList/>*/}
          {/*<br/>*/}

          {/*EditorCellContent*/}
          {/*<EditorCellContent/>*/}
          {/*<br/>*/}

          {/*EditorCellForm*/}
          {/*<EditorCellForm/>*/}
          {/*<br/>*/}

          {/*EditorCellController*/}
          {/*<EditorCellController/>*/}
          {/*<br/>*/}

          {/*SidebarApprovalStatus*/}
          {/*<SidebarApprovalStatus/>*/}
          {/*<br/>*/}

          {/*SidebarCellNode*/}
          {/*<SidebarCellNode/>*/}
          {/*<br/>*/}

          {/*SidebarCellRoot*/}
          {/*<SidebarCellRoot/>*/}
          {/*<br/>*/}

          {/*SidebarChangeCell*/}
          {/*<SidebarChangeCell/>*/}
          {/*<br/>*/}

          {/*SidebarCreateCell*/}
          {/*<SidebarCreateCell/>*/}
          {/*<br/>*/}

          {/*SidebarProjectExport*/}
          {/*<SidebarProjectExport/>*/}
          {/*<br/>*/}

          {/*SidebarProjectSettings*/}
          {/*<SidebarProjectSettings/>*/}
          {/*<br/>*/}

          {/*SidebarRevisionList*/}
          {/*<SidebarRevisionList/>*/}
          {/*<br/>*/}

          {/*SidebarSaveChanges*/}
          {/*<SidebarSaveChanges/>*/}
          {/*<br/>*/}

          {/*SidebarСreateRevision*/}
          {/*<SidebarСreateRevision/>*/}
          {/*<br/>*/}
        {/*</Box>*/}
      </Flex>
    );
  }
}

export default DragDropContext(HTML5Backend)(ProjectEditor);
