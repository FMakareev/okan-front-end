import {useritem} from "./userItem";
import {getRandomMongoID} from "../../helpers/getRandomMongoid";
import faker from "faker";

export const commentitem = () => {
  return {
  // # mongoid
  id: getRandomMongoID(),
  // # тест комментария
  message: faker.lorem.paragraph(),
  // # отправитель
  sender: useritem(),
  // # id сущности к которой привязан комментарий
  cell: getRandomMongoID(),
  // # id документа, при создании комментария id документа добавляется автоматически
  document: getRandomMongoID(),
  // # дата создания комментария, в формате ISO
  createdate: faker.date.past().toUTCString(),
  // # дата обновления комментария, в формате ISO
  updatedate: faker.date.past().toUTCString(),
  // # удален ли комментарий (?)
  isdelete: false,
  }
}
