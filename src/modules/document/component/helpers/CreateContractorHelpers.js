import React from 'react';
import CreateContractor from '../CreateContractor/CreateContractor';

/**View */
import Box from '@lib/ui/Box/Box';

export const CreateContractorHelpers = member => {
  return (
    <Box width={'100%'}>
      <CreateContractor
        names={{
          organizationname: member + '.user.organizationname',
          position: member + '.user.position',
          firstname: member + '.user.firstname',
          lastname: member + '.user.lastname',
          patronymic: member + '.user.patronymic',
          approvaldate: member + '.approvaldate',
          signature: member + '.user.signature',
        }}
      />
    </Box>
  );
};

export default CreateContractorHelpers;
