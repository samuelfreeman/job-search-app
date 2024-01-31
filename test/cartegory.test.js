const prisma = require('../utils/prisma');
const {
  createCartegories,
  findCartegories,
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
const editData = {
  description: 'Deals with managing and analyzing  financial data',
};

afterAll(async () => {
  await prisma.$disconnect();
});

describe('application operations ', () => {
  it('should add a cartegories ', async () => {
    const cartegories = await createCartegories(data);
    expect(cartegories).not.toBeNull();
  });

  it('should edit the cartegories', async () => {
    const cartegories = await editCartegory(data.id, editData);
    expect(cartegories).not.toBeNull();
  });
/*  it('should find a single cartegory', async () => {
    const cartegories = await singleCartegory(data.id);
    expect(cartegories).not.toBeNull()
  });
*/
  it('should remove cartegories', async () => {
    const cartegories = await delCartegory(data.id);
    expect(cartegories).not.toBeNull();
  });
});