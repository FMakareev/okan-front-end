import React, {Fragment} from 'react';
import Box from "../ProfileRightSide/ProfileRightSide";
import {CheckComponentAccessByRole} from "@lib/ui/CheckComponentAccessByRole/CheckComponentAccessByRole";
import {ROLE_ADMIN, ROLE_USER} from "@lib/shared/roles";
import DocumentsForApprovalQuery from "../../graphql/DocumentsForApprovalQuery.graphql";
import ProfileApproval from "../ProfileApproval/ProfileApproval";
import NotificationListQuery from "../../graphql/NotificationListQuery.graphql";
import ProfileNotification from "../ProfileNotification/ProfileNotification";
import PaginationPageHOC from "@lib/ui/PaginationPageHOC/PaginationPageHOC";
import PaginationPage from "@lib/ui/PaginationPage/PaginationPage";


export const ProfileLeftSide = ({
                                  user: {role, id},
                                }) => {
  console.log('ProfileLeftSide: ',role, id);
  return (<Fragment>
    <Box mb={'100px'}>
      <CheckComponentAccessByRole targetRole={[ROLE_USER, ROLE_ADMIN]} userRole={role}>
        <PaginationPageHOC
          queryName={'documentsForApproval'}
          queryVariables={{
            user: id,
          }}
          pageSize={5}
          pageNumber={1}
          query={DocumentsForApprovalQuery}>
          {props => (
            <PaginationPage
              {...props}
              data={props.data && props.data.documentsForApproval}
              Consumer={ProfileApproval}
            />
          )}
        </PaginationPageHOC>
      </CheckComponentAccessByRole>
    </Box>
    <Box>
      <CheckComponentAccessByRole
        targetRole={[ROLE_USER, ROLE_ADMIN]}
        userRole={role && role}>
        <PaginationPageHOC
          queryName={'notificationsList'}
          queryVariables={{}}
          pageSize={5}
          pageNumber={1}
          query={NotificationListQuery}>
          {props => (
            <PaginationPage
              {...props}
              data={props.data && props.data.notificationsList}
              Consumer={ProfileNotification}
            />
          )}
        </PaginationPageHOC>
      </CheckComponentAccessByRole>
    </Box>
  </Fragment>)
};


ProfileLeftSide.defaultProps = {
  user: {
    role: null,
    id: null
  }
}

export default ProfileLeftSide
