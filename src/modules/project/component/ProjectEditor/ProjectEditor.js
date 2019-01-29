import React, {Component} from 'react';

/** Components */

/**View */

/**PropTypes */
import {Flex} from "@lib/ui/Flex/Flex";
import styled from "styled-components";
import EditorCellController from "./EditorCellController";
import {commentitem} from "../../../../apollo/graphql/query/commentitem";
import {celItem} from "../../../../apollo/graphql/query/celItem";
import {withProject} from "../ProjectContext/ProjectContext";
import {EditorAdditionalMenu} from "./EditorAdditionalMenu";
import {EditorFormMainContent} from "./EditorFormMainContent";

const ContentWrapper = styled.div`
  background-color: #ffffff;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;  
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;



const EditorCellControllerWithProject =  withProject((props) => (<EditorCellController {...props}/>));

export class ProjectEditor extends Component {
  static propTypes = {};


  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {
  }

  render() {
    // TODO: есть проблема с z-index карточка комментария налезает поверх иконки ниже стоящего блока, решается во время итерациионного вывода блоков,
    // берем длнну массива блоков и начиная с первого задачем в порядке убывания z-index блокам

    return (
      <Flex pl={'10px'} pr={'40px'} mb={'20px'} flexDirection={'column'}>
        <ContentWrapper>
          <EditorCellControllerWithProject
            data={{
            ...celItem({ id:'', prevcell:'', nextcell:'', parent:'' }),
            comment: commentitem()
          }}/>
          <EditorCellControllerWithProject data={{
            ...celItem({ id:'', prevcell:'', nextcell:'', parent:'' }),
            comment: null
          }}/>
        </ContentWrapper>
        <EditorAdditionalMenu/>
        <EditorFormMainContent />
      </Flex>
    );
  }
}

export default ProjectEditor;
