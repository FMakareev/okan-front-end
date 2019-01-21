import faker from 'faker';
import {getRandomMongoID} from "../../helpers/getRandomMongoid";

export const documentitem = () => ({
  // mongoid
  id: getRandomMongoID(),
  // название шаблона
  name: faker.commerce.productName(),
  // id корневого элемента от которого строится граф разделов
  childcell: '37cea22b074140c6ac32a660',
  // null, на согласовании, согласован, не согласован
  approvalstatus: null,
});
