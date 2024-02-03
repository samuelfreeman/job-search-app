const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});
afterAll(async () => {
  await prisma.$disconnect();
});

// import the user helper functions
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  applyJobs,
  getAppliedJobs,
} = require('../helpers/userHelper');

const data = {
  id: '29389438nosd$n1!v3@254on48',
  fullname: 'Test user',
  email: 'Test@gmail.com',
  password: 'Password123@',
};
//  user tests begin
describe('user operations', () => {
  // creates a user into the database

  it('must create a user', async () => {
    const user = await createUser(data);
    expect(user).not.toBeNull();
    expect(user.fullname).toBe('Test user');
    expect(user.email).toBe('Test@gmail.com');
  });
  //gets user from the database
  it('should retrive a user', async () => {
    const user = await getSingleUser(data.id);
    expect(user).not.toBeNull();
    expect(user.email).toBe('Test@gmail.com');
  });
  //test to get all users
  it('should get all users', async () => {
    const users = await getUsers();
    expect(users).not.toBeNull();
  });

  //  test to update a user from the database
  it('should  update  a user ', async () => {
    const dataUpdate = {
      fullname: 'testName updated',
      password: 'passTest123@',
    };
    const user = await updateUser(data.id, dataUpdate);
    expect(user).not.toBeNull();
    expect(user.password).toBe('passTest123@');
  });
  //  get user applied jobs
  it('should get a users applied jobs', async () => {
    const user = await applyJobs(data.id);
    expect(user).not.toBeNull();
  });
  // test to get users applied jobs in with status
  it('should get a users applied jobs with status', async () => {
    const status = 'Accepted' || 'Declined';

    const user = await getAppliedJobs(data.id, status);
    expect(user).not.toBeNull();
  });

  // deletes user from the database
  it('should remove user from the database', async () => {
    const user = await deleteUser(data.id);

    expect(user).not.toBeNull();
  });
  // Add more tests as needed for other CRUD operations
});
