import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { BLOCK_TEXT } from '@lib/shared/blockType';
import { PROJECT_MODE_RW } from '../ProjectContext/ProjectContext';
import { Relative } from '@lib/ui/Relative/Relative';
import { Box } from '@lib/ui/Box/Box';
import { ProjectModeState } from '../ProjectContext/ProjectModeState';
import { EditorAdditionalMenu } from '../EditorAdditionalMenu/EditorAdditionalMenu';
import { Text } from '@lib/ui/Text/Text';
import { EditorTypeIcon } from '@lib/ui/EditorTypeIcon/EditorTypeIcon';

export class EditorCellControllerNumber extends Component {
  static propTypes = {
    content: PropTypes.object,
    editable: PropTypes.bool,
    id: PropTypes.string,
    nextcell: PropTypes.object,
    parent: PropTypes.object,
    prevcell: PropTypes.object,
    sectionNumber: PropTypes.string,
    sectionid: PropTypes.string,
    toggleAdditionalMenu: PropTypes.bool,
  };

  render() {
    const {
      toggleAdditionalMenu,
      editable,
      content,
      nextcell,
      prevcell,
      id,
      sectionid,
      sectionNumber,
      parent,
    } = this.props;
    return (
      <Relative pl={'10px'}>
        <Box mt={'-20px'} opacity={toggleAdditionalMenu ? 1 : 0}>
          <ProjectModeState is={PROJECT_MODE_RW}>
            <EditorAdditionalMenu
              prevcell={prevcell ? prevcell.id : null}
              nextcell={id}
              parentid={sectionid}
            />
          </ProjectModeState>
        </Box>

        <Text
          width={'100px'}
          fontFamily={'secondary'}
          lineHeight={'22px'}
          fontSize={6}
          color={'color4'}
          mt={'2px'}>
          {/** иконка редактора */}
          {editable && content.contenttype !== BLOCK_TEXT && (
            <EditorTypeIcon type={data.content.contenttype} />
          )}

          {/** номер текстового блока */}
          {content.contenttype === BLOCK_TEXT && parent && prevcell && (
            <Fragment> {sectionNumber}</Fragment>
          )}
        </Text>

        <Box opacity={toggleAdditionalMenu ? 1 : 0}>
          <ProjectModeState is={PROJECT_MODE_RW}>
            <EditorAdditionalMenu
              prevcell={id}
              nextcell={nextcell ? nextcell.id : null}
              parentid={sectionid}
            />
          </ProjectModeState>
        </Box>
      </Relative>
    );
  }
}

export default EditorCellControllerNumber;
