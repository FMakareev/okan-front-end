import faker from "faker";
import {ROLE_ADMIN, ROLE_USER} from "../../../shared/roles";

export const useritem = () => {
  const password = faker.internet.password();
  return {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    patronymic: faker.name.lastName(),
    birthdate: faker.date.past().toUTCString(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    password: password,
    confirmPassword: password,
    role: bankName ? ROLE_ADMIN : ROLE_USER,
  }
};
