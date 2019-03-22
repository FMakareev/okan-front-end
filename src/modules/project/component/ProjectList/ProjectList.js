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
  data: PropTypes.arrayOf({
    /** id project */
    id: PropTypes.string,
    /** name project */
    name: PropTypes.string,
  }),
};

export default ProjectList;
