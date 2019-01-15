import faker from 'faker';

export const useritem = () => {
  const password = faker.internet.password();
  return {
    id: faker.random.uuid(),
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
