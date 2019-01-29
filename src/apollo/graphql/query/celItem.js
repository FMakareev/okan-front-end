import faker from 'faker';
import {
  CELL_STATUS_CHECKED,
  CELL_STATUS_NOT_CHECKED,
  CELL_STATUS_CHANGED,
} from '../../../shared/approvalStatus';
import {getRandomMongoID} from '../../helpers/getRandomMongoid';
import {commentitem} from "./commentitem";

export const celItem = ({id, prevcell, nextcell, childcell, parent}) => {
  return {
    // mongoid
    id: id || getRandomMongoID(),
    // имя раздела
    name: faker.company.companyName(),
    // статус проверки ячейки
    verify: faker.random.arrayElement([
      CELL_STATUS_CHECKED,
      CELL_STATUS_NOT_CHECKED,
      CELL_STATUS_CHANGED,
    ]),
    // id предыдущей ячейки, оно равно id в свойстве parent если ячейка дочерняя другой ячейке и первая по счету
    prevcell: prevcell ? {
      ...celItem({id: prevcell,}),

    } : null,
    // id следующей ячейки
    nextcell: nextcell ? {
      ...celItem({id: nextcell}),

    } : null,
    // id родительской ячейки
    parent: parent ? {
      ...celItem({id: parent}),

    } : null,
    // id первой дочерней ячейки, от этой ячейки далее строятся запросы на получение всех дочерних ячеек
    children: childcell ? {
      ...celItem({id: childcell}),
    } : null,
    // говорит нам является ли ячейка названием раздела, а не блоком с контентом,
    // если равно false то id в поле childCell указывает не на дочернюю категорию, а на дочерний блок с контентом
    isHead: true,
    // контент раздела
    content: {
      number: faker.random.number(),
      // mongoid
      id: getRandomMongoID(),
      // заголовок
      name: faker.company.companyName(),
      // html контент фроалы
      content: faker.lorem.paragraph(),
      // тип контента: таблица, картинка, текст
      contenttype: faker.random.arrayElement(['table', 'text', 'img']),
    },
    // // массив комментариев ячейки
    comments: [commentitem()],
    // массив связанных объектов
    pull: [],
    // null, на согласовании, согласован, не согласован
    approvalstatus: '',
  };
};
