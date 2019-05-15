
export const CreateContractorHelpers = member => ({
  organizationname: member + '.user.organizationname',
  position: member + '.user.position',
  firstname: member + '.user.firstname',
  lastname: member + '.user.lastname',
  patronymic: member + '.user.patronymic',
  approvaldate: member + '.approvaldate',
  signature: member + '.user.signature',
});

export default CreateContractorHelpers;
