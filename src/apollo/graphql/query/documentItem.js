import faker from 'faker';

export const documentItem = {
  // mongoid
  id: faker.random.uuid(),
  // название шаблона
  name: faker.commerce.productName(),
  // id корневого элемента от которого строится граф разделов
  cell: 1,
  // null, на согласовании, согласован, не согласован
  approvalstatus: null,
};
