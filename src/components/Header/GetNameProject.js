import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Query, withApollo } from 'react-apollo';

/** Graphql schema */
import ProjectItemQuery from '../../modules/project/graphql/ProjectItemQuery.graphql';

export class GetNameProject extends Component {
  state = { name: '' };

  getIdProject(str) {
    const beginString = '/app/project/';

    if (str.indexOf(beginString) === 0) {
      let firstSlach = str.indexOf('/', 5) + 1;
      let secondSlach = str.indexOf('/', firstSlach);
      const id = secondSlach !== -1 ? str.slice(firstSlach, secondSlach) : str.slice(firstSlach);
      return this.getProject(id);
    }
  }

  getProject = idProject => {
    this.props.client
      .query({ query: ProjectItemQuery, variables: { id: idProject } }) // fetchPolicy: 'network-only',
      .then(({ data }) => {
        const projectName = data && data.projectitem.name;

        return this.setState(({ name }) => {
          return { name: projectName };
        });
      })
      .catch(error => {
        console.log('getProject error :', error);
      });
  };

  componentDidMount() {
    {
      this.getIdProject(this.props.location.pathname);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.getIdProject(nextProps.location.pathname);
    }
  }

  render() {
    const { name } = this.state;

    return <span title={name}>{name}</span>;
  }
}

GetNameProject = withRouter(GetNameProject);

GetNameProject = withApollo(GetNameProject);

export default GetNameProject;
