import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** Components */
import ProjectItem from './ProjectItem';

/** View */
import Box from '../../../../components/Box/Box';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Link from '../../../../components/Link/Link';

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

        <Link mr={6} to={`/app/project-create`} textDecoration={'none'}>
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
        </Link>
      </Box>
    );
  }
}

export default ProjectList;
