import faker from 'faker';
import {getRandomMongoID} from '../../helpers/getRandomMongoid';

export const blockitem = (props) => {
  return {
    // Содержимое блока
    content: props.content ? props.content : '',
    // Тип блока: text, table, image
    contenttype: props.contenttype ? props.contenttype : 'text',
    // mongoid
    id: props.id || getRandomMongoID(),
    // имя блока
    name: props.name ? props.name : '',
    // Номер блока
    number: faker.random.number()
  };
};
