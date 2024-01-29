const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//  before all test make sure we are connecting to prisma
beforeAll(async () => {
  await prisma.$connect();
});

//  after all tests make sure we are disconnecting from prisma
afterAll(async () => {
  await prisma.$disconnect();
});

//  user tests begin
describe('user operations', () => {
  // creates a user into the database

  it('must create a user', async () => {
    const check = await prisma.user.findUnique({
      where: {
        email: 'Test@gmail.com',
      },
    });
    
    if (check) {
      await prisma.user.delete({
        where: {
          email: 'Test@gmail.com',
        },
      });
    } else {
      const user = await prisma.user.create({
        data: {
          fullname: 'Test user',
          email: 'Test@gmail.com',
          password: 'Password123@',
        },
      });
      expect(user).not.toBeNull();
      expect(user.fullname).toBe('Test user');
      expect(user.email).toBe('Test@gmail.com');
    }
  });
  //gets user from the database
  it('should retrive a user', async () => {
    const user = await prisma.user.findUnique({
      where: {
        email: 'Test@gmail.com',
      },
    });
    expect(user).not.toBeNull();
    expect(user.email).toBe('Test@gmail.com');
  });
  //  test to update a user from the database
  it('should  update  a user ', async () => {
    const data = {
      fullname: 'testName updated',
      password: 'passTest123@',
    };
    const user = await prisma.user.update({
      where: {
        email: 'Test@gmail.com',
      },
      data,
    });
    expect(user).not.toBeNull();
    expect(user.password).toBe('passTest123@');
  });
  // deletes user from the database
  it('should remove user from the database', async () => {
    const user = await prisma.user.delete({
      where: {
        email: 'Test@gmail.com',
      },
    });

    expect(user).not.toBeNull();
  });
  // Add more tests as needed for other CRUD operations
});
