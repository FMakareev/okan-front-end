import {getRandomMongoID} from "../../helpers/getRandomMongoid";
import faker from "faker";
import {useritem} from "./userItem";
import {userlist} from "./userlist";
import {documentlist} from "./documentlist";


export const projectitem = () => {
  return {
  // # mongoid
  id:getRandomMongoID(),
    // # название проекта
  name:  faker.company.companyName(),
  // # пользователь создавший проект
  author: {"id":"8c8db342c28b4d9890d749f2","lastname":"Von","firstname":"Amelia","phone":"721.772.3517 x1683","position":"Kessler","patronymic":"Pfeffer","email":"Jaylin66@gmail.com","__typename":"User"},
  // # список участников
  partners: userlist(faker.random.number(5)),
  // # код документа ОКАН
  okancode: getRandomMongoID(),
  // # код документа заказчика
  customercode: getRandomMongoID(),
  // # mongoid документа проекта
  documents: documentlist(1),
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
