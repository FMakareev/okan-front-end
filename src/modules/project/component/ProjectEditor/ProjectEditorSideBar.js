import React, { Component } from 'react';
import styled from 'styled-components';

/** Components */
import ProjectEditorSideBarDrawing from './ProjectEditorSideBarDrawing';

/** View */
import Container from '../../../../components/Container/Container';

/**Image */
import { SvgTriangle } from '../../../../components/Icons/SvgTriangle';

const ContainerStyled = styled(Container)`
  margin: 10px 0 0 0;
`;

export class ProjectEditorSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ContainerStyled maxWidth={'320px'} width={'100%'}>
        <ProjectEditorSideBarDrawing nameSection={'I. ТЗ - RK-186-344'} />
        <ProjectEditorSideBarDrawing nameSection={'II. ПМ ПИ'} />
        <ProjectEditorSideBarDrawing nameSection={'III. ПМ ПCИ'} />
      </ContainerStyled>
    );
  }
}

export default ProjectEditorSideBar;
