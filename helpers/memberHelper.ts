import { faker } from '@faker-js/faker';

export function generateMemberDetails(): string {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName, provider: 'playwrighttest.no'});
  const phoneNumber = faker.phone.number({ style: 'national'});
  const password = faker.internet.password({ length: 8, prefix: 'pW!2' });

  const memberDetails = {
    firstName,
    lastName,
    email,
    phoneNumber,
    password
  };

  return JSON.stringify(memberDetails);
};
