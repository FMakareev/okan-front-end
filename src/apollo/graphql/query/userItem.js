import faker from 'faker';
import {getRandomMongoID} from "../../helpers/getRandomMongoid";
import {ROLE_USER} from "@lib/shared/roles";

export const useritem = () => {
  const password = faker.internet.password();
  return {
    id: getRandomMongoID(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    patronymic: faker.name.lastName(),
    position: faker.name.lastName(),
    birthdate: faker.date.past().toUTCString(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    password: password,
    confirmpassword: password,
    role: {
      id: getRandomMongoID(),
      name: ROLE_USER,
    },
  };
};
