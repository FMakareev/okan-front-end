import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Query, withApollo } from 'react-apollo';

/** Graphql schema */
import ProjectItemQuery from '../../modules/project/view/projectEditor/ProjectItemQuery.graphql';

export class GetNameProject extends Component {
  state = { name: '' };

  getProject = projectid => {
    this.props.client
      .query({
        query: ProjectItemQuery,
        // fetchPolicy: 'network-only',
        variables: { id: projectid },
      })
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
    const beginString = '/app/project/';
    const str = this.props.location.pathname;

    if (str.indexOf(beginString) === 0) {
      let result = str.indexOf('/', 5) + 1;
      const projectid = str.slice(result);
      return this.getProject(projectid);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props.name) {
      this.getProject(nextProps);
    }
  }

  render() {
    const { name } = this.state;

    return <Fragment>{name}</Fragment>;
  }
}

GetNameProject = withRouter(GetNameProject);

GetNameProject = withApollo(GetNameProject);

export default GetNameProject;
