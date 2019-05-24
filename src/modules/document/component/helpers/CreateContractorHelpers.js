export const CreateContractorHelpers = member => ({
  organizationname: member + '.user.organizationname',
  position: member + '.user.position',
  firstname: member + '.user.firstname',
  lastname: member + '.user.lastname',
  patronymic: member + '.user.patronymic',
  signature: member + '.user.signature',
  approvaldate: member + '.approvaldate',
});

export default CreateContractorHelpers;
