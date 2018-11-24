// ProductItem
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Make sure the query is also exported -- not just the component
export const GET_PRODUCT_QUERY = gql`
  query getProduct($name: String) {
    product(name: $name) {
      id
      name
      breed
    }
  }
`;

export const ProductItem = ({ name }) => (
  <Query query={GET_PRODUCT_QUERY} variables={{ name }}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return `Error!`;

      return (
        <p>
          {data.product.name} is a {data.product.breed}
        </p>
      );
    }}
  </Query>
);

export default ProductItem;
