import faker from 'faker';
import {getRandomMongoID} from "../../helpers/getRandomMongoid";

export const useritem = () => {
  const password = faker.internet.password();
  return {
    id: getRandomMongoID(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    patronymic: faker.name.lastName(),
    birthdate: faker.date.past().toUTCString(),
    // email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    // password: password,
    // confirmpassword: password,
    // role: ROLE_USER,
  };
};
