import React, { Component } from 'react';

export class Page extends Component {
  render() {
    const { data, pageSize, pageNumber, Component, id } = this.props;
    return (
      <Component
        data={data}
        onLoadMore={() =>
          fetchMore({
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                notification: [...prev.data, ...fetchMoreResult.data],
              });
            },
          })
        }
      />
    );
  }
}

export default Page;
