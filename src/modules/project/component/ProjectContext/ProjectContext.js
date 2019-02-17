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
    /** редактируемый ли проект или нет, если нет то все кнопки отвечающие за редактирование скрываются */
    editable: PropTypes.bool,
    /** параметры роутера */
    position: PropTypes.shape({
      /** id активной ячейки */
      sectionid: PropTypes.string,
      /** id документа в котором активна ячейка */
      documentid: PropTypes.string,
      /** id открытого проекта */
      projectid: PropTypes.string,
      /** id ревизии документа */
      revisionid: PropTypes.string,
    }),
    /** объект активного проекта */
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
