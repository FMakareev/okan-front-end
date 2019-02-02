import faker from 'faker';
import {getRandomMongoID} from "../../helpers/getRandomMongoid";
import {useritem} from "./userItem";

export const documentitem = () => ({
  // mongoid
  id: getRandomMongoID(),
  // название шаблона
  name: faker.commerce.productName(),
  // id корневого элемента от которого строится граф разделов
  children: {
    id: '37cea22b074140c6ac32a660'
  },
  // null, на согласовании, согласован, не согласован
  approvalstatus: null,

  partners: [],
  okancode: faker.commerce.productName(),
  customercode: faker.commerce.productName(),
  version: faker.commerce.productName(),
  createrevisiondate: faker.date.past().toUTCString(),
  authorrrevision: useritem()
});
