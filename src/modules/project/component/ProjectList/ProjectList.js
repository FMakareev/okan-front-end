import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/** Components */
import ProjectItem from './ProjectItem';

export const ProjectList = ({ data }) => {
  return (
    <Fragment>
      {data && data.map((item, index) => <ProjectItem {...item} key={`ProjectItem-${index}`} />)}
    </Fragment>
  );
};

ProjectList.propTypes = {
  /** Data */
  data: PropTypes.objectOf(PropTypes.string),
};

export default ProjectList;
