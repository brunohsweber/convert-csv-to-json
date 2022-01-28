import faker from "@faker-js/faker";

function createFakeData() {
  const limit = 30;
  let i = 0;

  const data = [];

  while (i <= limit) {
    data.push({
      randomName: faker.name.findName(),
      randomEmail: faker.internet.email()
    });

    i += 1;
  }

  return data;
}

export { createFakeData };