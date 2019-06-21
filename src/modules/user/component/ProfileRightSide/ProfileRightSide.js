import React, {Fragment} from 'react';
import Box from "@lib/ui/Box/Box";
import {CheckComponentAccessByRole} from "@lib/ui/CheckComponentAccessByRole/CheckComponentAccessByRole";
import {ROLE_ADMIN, ROLE_USER} from "@lib/shared/roles";
import FormProfileCreateUser from "../../view/profile";
import FormPersonDataWithQuery from "../FormPersonDataWithQuery/FormPersonDataWithQuery";
import FormProfileRecoveryEmail from "../FormProfileRecoveryEmail/FormProfileRecoveryEmail";
import FormChangePassword from "../FormChangePassword/FormChangePassword";




export const ProfileRightSide = ({
                                   user: {role, id},
                                 }) => {

  return (<Fragment>
    <Box  mb={'100px'}>
      <CheckComponentAccessByRole targetRole={[ROLE_ADMIN]} userRole={role && role}>
        <FormProfileCreateUser/>
      </CheckComponentAccessByRole>

      <CheckComponentAccessByRole targetRole={[ROLE_USER]} userRole={role && role}>
        <FormPersonDataWithQuery id={id}/>
      </CheckComponentAccessByRole>
    </Box>
    <Box>
      <CheckComponentAccessByRole targetRole={[ROLE_ADMIN]} userRole={role && role}>
        <FormProfileRecoveryEmail/>
      </CheckComponentAccessByRole>

      <CheckComponentAccessByRole targetRole={[ROLE_USER]} userRole={role && role}>
        <FormChangePassword/>
      </CheckComponentAccessByRole>
    </Box>
  </Fragment>)
};

ProfileRightSide.defaultProps = {
  user: {
    role: null,
    id: null
  }
};

export default ProfileRightSide
