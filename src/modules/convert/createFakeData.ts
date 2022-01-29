import { v4 as uuidV4 } from "uuid";

import faker from "@faker-js/faker/locale/pt_BR";

class CreateFakeData {
  person() {
    const limit = 30;
    let i = 0;

    const person = [];

    while (i <= limit) {
      person.push({
        uuid: uuidV4(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.gender(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        avatar: faker.image.avatar()
      });

      i += 1;
    }

    return person;
  }

  products() {
    const limit = 30;
    let i = 0;

    const products = [];

    while (i <= limit) {
      products.push({
        uuid: uuidV4(),
        product: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price()
      });

      i += 1;
    }

    return products;
  }

  vehicles() {
    const limit = 30;
    let i = 0;

    const vehicles = [];

    while (i <= limit) {
      vehicles.push({
        uuid: uuidV4(),
        vehicle: faker.vehicle.vehicle(),
        manufacturer: faker.vehicle.manufacturer(),
        color: faker.vehicle.color()
      });

      i += 1;
    }

    return vehicles;
  }
}

export { CreateFakeData };
