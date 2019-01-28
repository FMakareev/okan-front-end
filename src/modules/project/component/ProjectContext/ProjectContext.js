import React from "react";


export const ProjectContext = React.createContext();


export const withProject = (Component) => {
  return (props) => {
    return (
      <ProjectContext.Consumer>
        {project => <Component {...props} project={project}/>}
      </ProjectContext.Consumer>
    );
  };
};
