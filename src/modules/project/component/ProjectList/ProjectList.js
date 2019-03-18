import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/** Components */
import ProjectItem from './ProjectItem';

export const ProjectList = ({ data }) => {
  return (
    <Fragment>
      {Array.isArray(data) &&
        data.map((item, index) => <ProjectItem {...item} key={`ProjectItem-${index}`} />)}
    </Fragment>
  );
};

ProjectList.propTypes = {
  /** Data */
  data: PropTypes.any,
};

export default ProjectList;
