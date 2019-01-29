import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** Components */
import ProjectItem from './ProjectItem';

/** View */
import Box from '../../../../components/Box/Box';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Link from '../../../../components/Link/Link';

export class ProjectList extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    console.log(1, data);

    return (
      <Box>
        {data && data.map((item, index) => <ProjectItem {...item} key={`ProjectItem-${index}`} />)}
      </Box>
    );
  }
}

export default ProjectList;
