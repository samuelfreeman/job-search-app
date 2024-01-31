const prisma = require('../utils/prisma');
const {
  createApplications,
  updateApplication,
  updateManyAppications,
  findApplications,
  find_application_status,
  deleteApplication,
  createSingleApplication,
  find_single_Application,
  preventDoubleApplication,
} = require('../helpers/applicationHelper');

beforeAll(async () => {
  await prisma.$connect();
});
const data = {
  id: '216376@#$@#jsdfsk',
  status: 'Accepted',
};
afterAll(async () => {
  await prisma.$disconnect();
});

describe('application operations ', () => {
  it('should  create an application ', async () => {
    const application = await createApplications(data);
    expect(application).not.toBeNull();
  });
//    work on this test its not working
/*  it('should get a single  application ', async () => {
    const application = await find_single_Application(data.id);
    
    
    expect(application).not.toBeNull();
  });*/
  it('should remove an application', async () => {
    const application = await deleteApplication(data.id);
    expect(application).not.toBeNull();
  });
});
