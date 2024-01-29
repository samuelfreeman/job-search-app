const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});
afterAll(async () => {
  await prisma.$disconnect();
});
describe('Admin  operations', () => {
  // create a new admin into the database
  it('should create a new user', async () => {
    const admin = await prisma.admin.create({
      data: {
        fullname: 'Test admin',
        email: 'test@example.com',
        password: 'Password123@',
      },
    });

    expect(admin.fullname).toBe('Test admin');
    expect(admin.email).toBe('test@example.com');
  });
  // gets the admin by email
  it('should retrieve a user by email', async () => {
    const admin = await prisma.admin.findFirst({
      where: {
        email: 'test@example.com',
      },
    });

    expect(admin).not.toBeNull();
    expect(admin.fullname).toBe('Test admin');
  });
  // deletes the admin from the database
  it('should remove Test admin from the database', async () => {
    const admin = await prisma.admin.delete({
      where: {
        email: 'test@example.com',
      },
    });

    expect(admin).not.toBeNull();
    expect(admin.fullname).toBe('Test admin');
  });

  // Add more tests as needed for other CRUD operations
});

describe('user operations', () => {
  // creates a user into the database

  it('must create a user', async () => {
    const check = await prisma.user.findUnique({
      where: {
        email: 'Test@gmail.com',
      },
    });
    console.log(check);
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
  // deletes user from the database
  it('should remove user from the database', async () => {
    const user = await prisma.user.delete({
      where: {
        email: 'Test@gmail.com',
      },
    });

    expect(user).not.toBeNull();
    expect(user.fullname).toBe('Test user');
  });
  // Add more tests as needed for other CRUD operations
});
