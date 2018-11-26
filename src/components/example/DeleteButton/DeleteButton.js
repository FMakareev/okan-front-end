import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";

export const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($name: String!) {
    deleteProduct(name: $name) {
      id
      name
      breed
    }
  }
`;

export const DeleteButton = () => (
  <Mutation mutation={DELETE_PRODUCT_MUTATION}>
    {(mutate, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error!</p>;
      if (data) return <p>Deleted!</p>;

      return (
        <button onClick={() => mutate({ variables: { name: 'Buck' } })}>
          Click me to Delete Buck!
        </button>
      );
    }}
  </Mutation>
);
