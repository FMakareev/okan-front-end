import React, { Component } from 'react';
import { ProjectContextPropTypes, withProject } from './ProjectContext';
import PropTypes from 'prop-types';

/** @desc компонент проверяет соответствует ли текущий режим работы редактора проекта тому режиму который был передан в is и если соответствует то рендерит компонент иначе пусто*/
export class ProjectModeState extends Component {
  static propTypes = {
    is: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    ...ProjectContextPropTypes,
  };

  render() {
    const { is, children, project } = this.props;
    // console.log(this.props);
    if (Array.isArray(is)) {
      if (is.findIndex(item => item === project.mode) >= 0) {
        return children;
      }
    } else {
      if (project.mode === is) {
        return children;
      }
    }
    return null;
  }
}

ProjectModeState = withProject(ProjectModeState);

export default ProjectModeState;
