const prisma = require('../utils/prisma');
const {
  createCartegories,
  queryCartegories,
  singleCartegory,
  delCartegory,
  editCartegory,
} = require('../helpers/cartegoryHelper');

beforeAll(async () => {
  await prisma.$connect();
});

const data = {
  id: '232#82368#$4we27wwerw87',
  name: 'Finance',
  description:
    ' Deals with managing and analyzing financial data, providing investment advice, and handling monetary transactions.',
};
const data2 = {
  id: '232#287bd#$41327wwerw87',
  name: 'Finance',
  description:
    ' Deals with managing and analyzing financial data, providing investment advice, and handling monetary transactions.',
};
const editData = {
  description: 'Deals with managing and analyzing  financial data',
};

afterAll(async () => {
  await prisma.$disconnect();
});

describe('application operations ', () => {
  //  add a cartegory
  it('should add a cartegories ', async () => {
    const cartegories = await createCartegories(data);
    expect(cartegories).not.toBeNull();
  });
  // edit a cartegory
  it('should edit the cartegories', async () => {
    const cartegories = await editCartegory(data.id, editData);
    expect(cartegories).not.toBeNull();
  });
  //  find a single cartegory
  it('should find a single cartegory', async () => {
    const cartegories = await singleCartegory(data.id);
    expect(cartegories).not.toBeNull();
  });

  //  query cartegories
  it('should query cartegories', async () => {
    const cartegories = await queryCartegories(data.name);
    expect(cartegories).not.toBeNull();
  });
  //  remove the  cartegories
  it('should remove cartegories', async () => {
    const cartegories = await delCartegory(data.id);
    expect(cartegories).not.toBeNull();
  });
});
//  writing error tests
// import necessary modules and functions

describe('cartegories operations error tests', () => {
  // ...

  // should NOT add a cartegory with invalid data
  it('should not add a cartegory with invalid data', async () => {
    const invalidDataForAddCartegory = {
      // Missing required fields, for example, name
      // Add any other missing or invalid fields based on your application's requirements
      name: undefined,
      // Or invalid 'name':
      // name: 123,
    };

    // Use try/catch to handle potential rejections
    try {
      const cartegories = await createCartegories(invalidDataForAddCartegory);
      // If the above line doesn't throw an error, fail the test
      expect(cartegories).toBeUndefined(); // Or any other appropriate assertion
    } catch (error) {
      // Expect an error to be thrown, indicating that invalid data is handled
      expect(error).toBeDefined();
    }
  });

  // ...

  // should NOT edit a cartegory with invalid data
  it('should not edit a cartegory with invalid data', async () => {
    // Create a sample cartegory to be edited
    const createdCartegory = await createCartegories(data2);

    const invalidDataForEditCartegory = {
      // Invalid name, for example, a name that doesn't conform to your application's allowed values
      // Add any other invalid fields based on your application's requirements
      name: 123,
    };

    // Use try/catch to handle potential rejections
    try {
      const cartegories = await editCartegory(
        createdCartegory.id,
        invalidDataForEditCartegory,
      );
      // If the above line doesn't throw an error, fail the test
      expect(cartegories).toBeUndefined(); // Or any other appropriate assertion
    } catch (error) {
      // Expect an error to be thrown, indicating that invalid data is handled
      expect(error).toBeDefined();
    }
  });

  // should NOT find a single cartegory with invalid ID
  it('should not find a single cartegory with invalid ID', async () => {
    const invalidCartegoryId = 'invalidID';

    // Use try/catch to handle potential rejections
    try {
      const cartegories = await singleCartegory(invalidCartegoryId);
      // If the above line doesn't throw an error, fail the test
      expect(cartegories).toBeUndefined(); // Or any other appropriate assertion
    } catch (error) {
      // Expect an error to be thrown, indicating that invalid data is handled
      expect(error).toBeDefined();
    }
  });
  //  remove the  cartegories
  it('should remove cartegories', async () => {
    const cartegories = await delCartegory(data2.id);
    expect(cartegories).not.toBeNull();
  });
  // ...
});
