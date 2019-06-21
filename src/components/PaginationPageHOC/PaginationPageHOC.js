import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**View */
import {Query} from 'react-apollo';

export class PaginationPageHOC extends Component {
  static propTypes = {
    queryName: PropTypes.string,
    pageSize: PropTypes.number,
    pageNumber: PropTypes.number,
    query: PropTypes.any,
    queryVariables: PropTypes.any,
  };

  static defaultProps = {
    pageSize: 10,
    pageNumber: 1,
    fetchPolicy: "cache-first",
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    const {pageNumber, pageSize} = this.props;
    return {
      pageNumber,
      pageSize,
    };
  }

  reFetchAfterSetState = fetchMore => () => {
    const {pageSize, pageNumber} = this.state;
    const {queryName, query, fetchPolicy, queryVariables} = this.props;
    fetchMore({
      fetchPolicy,
      query: query,
      variables: {
        ...queryVariables,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (!fetchMoreResult) return {[queryName]: []};
        return fetchMoreResult;
      },
    });
  };

  prevPage = fetchMore => {
    const {pageNumber} = this.state;
    try {
      if (pageNumber >= 1) {
        this.setState(
          state => ({
            ...state,
            pageNumber: pageNumber - 1,
          }),
          this.reFetchAfterSetState(fetchMore),
        );
      }
    } catch (error) {
      console.error('Error prevPage: ', error);
    }
  };

  nextPage = fetchMore => {
    const {pageNumber} = this.state;
    try {
      this.setState(
        state => ({
          ...state,
          pageNumber: pageNumber + 1,
        }),
        this.reFetchAfterSetState(fetchMore),
      );
    } catch (error) {
      console.error('Error nextPage:', error);
    }
  };

  render() {
    const {query, queryVariables, fetchPolicy, queryName} = this.props;
    const {pageNumber, pageSize} = this.state;
    return (
      <Query
        fetchPolicy={fetchPolicy}
        skip={!query}
        variables={{
          ...queryVariables,
          pageSize: pageSize,
          pageNumber: pageNumber,
        }}
        query={query}>
        {({loading, error, data, fetchMore}) => {
          const Children = this.props.children;
          return (
            <Children
              data={data}
              loading={loading}
              error={error}
              pagination={{
                pageSize: pageSize,
                pageNumber: pageNumber,
                nextPage: () => {
                  this.nextPage(fetchMore, data);
                },
                disabledToNextPage:
                  loading ||
                  (data[queryName] && data[queryName].length === 0) ||
                  (data[queryName] && data[queryName].length < pageSize),
                prevPage: () => {
                  this.prevPage(fetchMore, data);
                },
                disabledToPrevPage: pageNumber - 1 < 1,
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default PaginationPageHOC;
