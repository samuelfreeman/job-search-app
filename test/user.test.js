const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

//  user tests begin
describe('user operations', () => {
  // creates a user into the database

  it('must create a user', async () => {
    const data = {
      id: '29389438nosd$n1!v3@254on48',
      fullname: 'Test user',
      email: 'Test@gmail.com',
      password: 'Password123@',
    };
    const user = await createUser(data);
    expect(user).not.toBeNull();
    expect(user.fullname).toBe('Test user');
    expect(user.email).toBe('Test@gmail.com');
  });
  //gets user from the database
  it('should retrive a user', async () => {
    const id =  '29389438nosd$n1!v3@254on48' 
    const user = await getSingleUser(id);
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
    const id = '29389438nosd$n1!v3@254on48';
    const data = {
      fullname: 'testName updated',
      password: 'passTest123@',
    };
    const user = await updateUser(id, data);
    expect(user).not.toBeNull();
    expect(user.password).toBe('passTest123@');
  });
  //  get user applied jobs
  it('should get a users applied jobs', async () => {
    const id = '29389438nosd$n1!v3@254on48';
    const user = await applyJobs(id);
    expect(user).not.toBeNull();
  });
  // test to get users applied jobs in with status
  it('should get a users applied jobs with status', async () => {
    const status = 'Accepted' || 'Declined';
    const id = '29389438nosd$n1!v3@254on48';
    const user = await getAppliedJobs(id, status);
    expect(user).not.toBeNull();
  });

  // deletes user from the database
  it('should remove user from the database', async () => {
    const id = '29389438nosd$n1!v3@254on48';
    const user = await deleteUser(id);

    expect(user).not.toBeNull();
  });
  // Add more tests as needed for other CRUD operations
});
