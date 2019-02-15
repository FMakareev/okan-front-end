import React from 'react';
import PropTypes from 'prop-types';

export const ProjectContext = React.createContext();

export const withProject = Component => {
  return props => {
    return (
      <ProjectContext.Consumer>
        {project => <Component {...props} project={project} />}
      </ProjectContext.Consumer>
    );
  };
};

export const ProjectContextPropTypes = {
  project: PropTypes.shape({
    position: PropTypes.shape({
      cellid: PropTypes.string,
      sectionid: PropTypes.string,
      documentid: PropTypes.string,
      projectid: PropTypes.string,
    }),
    project: {
      author: PropTypes.shape({
        id: PropTypes.string,
      }),
      createdate: PropTypes.string,
      documents: PropTypes.array,
      id: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.string,
      updatedate: PropTypes.string,
    }
  }),
};
