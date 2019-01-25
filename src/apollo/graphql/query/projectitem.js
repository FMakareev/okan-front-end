import {getRandomMongoID} from "../../helpers/getRandomMongoid";
import faker from "faker";
import {useritem} from "./userItem";
import {userlist} from "./userlist";


export const projectitem = () => {
  return {
  // # mongoid
  id:getRandomMongoID(),
    // # название проекта
  name:  faker.company.companyName(),
  // # пользователь создавший проект
  author: useritem(),
  // # список участников
  partners: userlist(faker.random.number(5)),
  // # код документа ОКАН
  okancode: getRandomMongoID(),
  // # код документа заказчика
  customercode: getRandomMongoID(),
  // # mongoid документа проекта
  documents: [getRandomMongoID()],
  // # дата создания
  createdate: faker.date.past().toUTCString(),
  // # дата обновления
  updatedate: faker.date.past().toUTCString(),
  // # массив ревизий проекта
  revisions: [getRandomMongoID()],
  // # archive or working
  status: faker.random.arrayElement(['archive','working']),
  }
}
