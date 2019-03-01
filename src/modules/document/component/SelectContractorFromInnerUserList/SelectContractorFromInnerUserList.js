import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {SelectBase, SelectStyles} from "@lib/ui/SelectBase/SelectBase";
import UserListQuery from './UserListQuery.graphql';

const NewSelectStyles = {
  ...SelectStyles,
  control: (style, props) => {
    return {
      ...style,
      width: '100%',
      padding: '0 0 0 10px',
      cursor: 'pointer',
      minHeight: '30px'
    };
  },
  menu: style => {
    return {
      ...style,
      margin: 0,
      borderRadius: '5px',
    };
  },
};


export class SelectContractorFromInnerUserList extends Component {

  onChange = () => {}

  render(){
    return (<Query query={UserListQuery}>
      {({ loading, data }) => {

        return (<SelectBase
          {...this.props}
          isLoading={loading}
          placeholder={'Выберите пользователя'}
          styles={NewSelectStyles}
          labelKey={'name'}
          valueKey={'id'}
          options={
            data &&
            data.userlist &&
            data.userlist.map(item => ({
              id: item.id,
              name: `${item.firstname} ${item.lastname} ${item.patronymic}`,
            }))
          }
        />)
      }}
    </Query>)
  }
}
