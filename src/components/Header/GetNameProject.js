import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {Query, withApollo} from 'react-apollo';
import styled from 'styled-components';

/** Graphql schema */
import ProjectItemQuery from '../../modules/project/graphql/ProjectItemQuery.graphql';


export const TitleWrapper = styled.div`
    overflow: hidden;
    max-width: 400px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
`;


export class GetNameProject extends Component {
  state = {name: ''};

  getIdProject(str) {
    const beginString = '/app/project/';

    if (str.indexOf(beginString) === 0) {
      let firstSlash = str.indexOf('/', 5) + 1;
      let secondSlash = str.indexOf('/', firstSlash);
      const id = secondSlash !== -1 ? str.slice(firstSlash, secondSlash) : str.slice(firstSlash);
      return this.getProject(id);
    }
  }

  getProject = idProject => {
    this.props.client
      .query({query: ProjectItemQuery, variables: {id: idProject}}) // fetchPolicy: 'network-only',
      .then(({data}) => {
        const projectName = data && data.projectitem.name;

        return this.setState(({name}) => {
          return {name: projectName};
        });
      })
      .catch(error => {
        console.log('getProject error :', error);
      });
  };

  componentDidMount() {
    if (!this.props.pageTitle) {
      this.getIdProject(this.props.location.pathname);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.pageTitle && nextProps.location.pathname !== this.props.location.pathname) {
      this.getIdProject(nextProps.location.pathname);
    }
  }

  render() {
    const {name} = this.state;
    const {pageTitle} = this.props;

    return <TitleWrapper title={name || pageTitle}>{name || pageTitle}</TitleWrapper>;
  }
}

GetNameProject = withRouter(GetNameProject);

GetNameProject = withApollo(GetNameProject);

export default GetNameProject;
