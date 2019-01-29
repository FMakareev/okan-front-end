import faker from 'faker';
import { getRandomMongoID } from '../../helpers/getRandomMongoid';

export const revisionitem = () => {
  return {
    id: getRandomMongoID(),
    name: faker.name.firstName(),
    // okancode: faker.name.lastName(),
    // customercode: faker.name.lastName(),
    // documents: faker.date.past().toUTCString(),
    // createdate: faker.phone.phoneNumber(),
    // updatedate: faker.internet.email(),
    // revisions: faker.phone.phoneNumber(),
    // status: faker.phone.phoneNumber(),
  };
};
