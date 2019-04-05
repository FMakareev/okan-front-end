import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { SelectBase } from '@lib/ui/SelectBase/SelectBase';
import UserListQuery from '../../graphql/UserListQuery.graphql';
import { TooltipBase } from '@lib/ui/TooltipBase/TooltipBase';

export class SelectContractorFromInnerUserList extends PureComponent {
  onChange = () => {};

  render() {
    const { meta } = this.props;
    return (
      <Query query={UserListQuery}>
        {({ loading, data }) => {
          return (
            <div
              style={{
                position: 'relative',
              }}>
              <SelectBase
                {...this.props}
                isLoading={loading}
                placeholder={'Выберите пользователя'}
                labelKey={'name'}
                valueKey={'id'}
                options={
                  data &&
                  data.userList &&
                  data.userList.map(item => ({
                    id: item.id,
                    name: `${item.firstname} ${item.lastname} ${item.patronymic}`,
                    role: item.role,
                  }))
                }
              />
              <TooltipBase
                position={'bottom'}
                isActive={meta.touched && meta.error}
                warning={meta.error}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
