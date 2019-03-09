import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {SelectBase, SelectStyles} from "@lib/ui/SelectBase/SelectBase";
import UserListQuery from './UserListQuery.graphql';



export class SelectContractorFromInnerUserList extends Component {

  onChange = () => {}

  render(){
    return (<Query query={UserListQuery}>
      {({ loading, data }) => {

        return (<SelectBase
          {...this.props}
          isLoading={loading}
          placeholder={'Выберите пользователя'}
          labelKey={'name'}
          valueKey={'id'}
          options={
            data &&
            data.userlist &&
            data.userlist.map(item => ({
              id: item.id,
              name: `${item.firstname} ${item.lastname} ${item.patronymic}`,
              role: item.role,
            }))
          }
        />)
      }}
    </Query>)
  }
}