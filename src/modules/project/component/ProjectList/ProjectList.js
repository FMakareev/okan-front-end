import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** Components */
import ProjectItem from './ProjectItem';

/** View */
import Box from '../../../../components/Box/Box';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';

/** Image */
import settings from '../../../../assets/image/settings.png';
import { SvgPlay } from '../../../../components/Icons/SvgPlay';

export class ProjectList extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box>
        <ProjectItem />

        <ProjectItem />

        <ProjectItem />

        <ProjectItem />

        <ProjectItem />

        <ProjectItem />

        <ProjectItem />

        <ProjectItem />

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Создать проект'}
          rightIcon={SvgPlay()}
          ml={9}
          width={'100%'}
          widthIcon={'10px'}
        />
      </Box>
    );
  }
}

export default ProjectList;
