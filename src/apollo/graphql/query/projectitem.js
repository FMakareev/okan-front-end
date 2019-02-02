import {getRandomMongoID} from "../../helpers/getRandomMongoid";
import faker from "faker";
import {useritem} from "./userItem";
import {userlist} from "./userlist";
import {documentlist} from "./documentlist";


export const projectitem = (props) => {
  return {
    // # mongoid
    id: getRandomMongoID(),
    // # название проекта
    name: faker.company.companyName(),
    // # пользователь создавший проект
    author: {
      "id": "8c8db342c28b4d9890d749f2",
      "lastname": "Von",
      "firstname": "Amelia",
      "phone": "721.772.3517 x1683",
      "position": "Kessler",
      "patronymic": "Pfeffer",
      "email": "Jaylin66@gmail.com",
      "__typename": "User"
    },
    // # список участников
    partners: userlist().slice(0,2),
    // # mongoid документа проекта
    documents: documentlist(1),
    // # дата создания
    createdate: faker.date.past().toUTCString(),
    // # дата обновления
    updatedate: faker.date.past().toUTCString(),
    // # массив ревизий проекта
    revisions: [getRandomMongoID()],
    // # archive or working
    status: faker.random.arrayElement(['archive', 'working']),
    ...props,
  }
}
