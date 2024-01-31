const prisma = require('../utils/prisma');

const {
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require('../helpers/adminHelper');

//  before all test make sure we are connecting to prisma
beforeAll(async () => {
  await prisma.$connect();
});
//  after all tests make sure we are disconnecting from prisma
afterAll(async () => {
  await prisma.$disconnect();
});
describe('Admin  operations', () => {
  // create a new admin into the database
  it('should create a admin', async () => {
    const data = {
      id: '1297nson39hns98',
      fullname: 'Test admin',
      email: 'test@example.com',
      password: 'Password123@',
    };
    const admin = await createAdmin(data);

    expect(admin.fullname).toBe('Test admin');
    expect(admin.email).toBe('test@example.com');
  });
  // gets the admin by email
  it('should retrieve a user by id', async () => {
    const id = '1297nson39hns98';

    const admin = await getAdmin(id);

    expect(admin).not.toBeNull();
    expect(admin.fullname).toBe('Test admin');
  });
  // test to update a user from the database
  it('should  update  an admin ', async () => {
    const id = '1297nson39hns98';
    const data = {
      fullname: 'testName updated',
      password: 'passTest123@',
    };

    const admin = await updateAdmin(id, data);

    expect(admin).not.toBeNull();
    expect(admin.password).toBe('passTest123@');
  });

  // deletes the admin from the database
  it('should remove Test admin from the database', async () => {
    const id = '1297nson39hns98';
    const admin = await deleteAdmin(id);

    expect(admin).not.toBeNull();
  });

  // Add more tests as needed for other CRUD operations
});
