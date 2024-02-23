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
} = require('../helpers/applicationHelper');

beforeAll(async () => {
  await prisma.$connect();
});
const data = {
  id: '216376@#$@#jsdusk',
  status: 'Accepted',
};
const data2 = {
  id: '2163769823jsdusk',
  status: 'Accepted',
};
const arrayData = [
  {
    id: 'sdlkf2347234##$%',
    status: 'Submitted',
  },
  {
    id: 'sdlkf2932234##$%',
    status: 'Accepted',
  },
  {
    id: 'sdl23972s9df32234##$%',
    status: 'Declined',
  },
];
const applicationIds = [
  'sdlkf2347234##$%',
  'sdlkf2932234##$%',
  'sdl23972s9df32234##$%',
];
afterAll(async () => {
  await prisma.$disconnect();
});
//  create  a sample application
describe('application operations ', () => {
  it('should  create an application ', async () => {
    const application = await createApplications(arrayData);
    expect(application).not.toBeNull();
  });
  //  get all applications
  it('should find all applications', async () => {
    const applications = await findApplications();
    expect(applications).not.toBeNull();
  });
  //  get a single application
  it('should get a single  application ', async () => {
    const application = await find_single_Application(arrayData[0].id);
    expect(application).not.toBeNull();
  });
  //  update an application
  it('should update an application', async () => {
    // reject application
    data.status = 'Declined';
    const application = await updateApplication(arrayData[0].id, {
      status: 'Declined',
    });
    expect(application.status).toBe('Declined');
  });
  //  remove the array  applications
  it('should remove an application', async () => {
    const application = await Promise.all(
      arrayData.map((item) => deleteApplication(item.id)),
    );
    expect(application).not.toBeNull();
  });
  // create a single application
  it('should create an application', async () => {
    const application = await createSingleApplication(data);

    expect(application).not.toBeNull();
  });
  // update many applications
  it('should update all applications based on a status ', async () => {
    const application = await updateManyAppications(applicationIds, {
      status: data.status,
    });
    expect(application).not.toBeNull();
  });
  // find application by status
  it('should find application by status', async () => {
    const application = await find_application_status(data.status);
    expect(application).not.toBeNull();
  });
  //  delete an application
  it('should delete the single application in the data object', async () => {
    const application = await deleteApplication(data.id);
    expect(application).not.toBeNull();
  });
});

// tests for errors
// import necessary modules and functions

describe('application operations  Error tests', () => {
  // ...

  // should NOT create an application with invalid data
  it('should not create an application with invalid data', async () => {
    const invalidDataForCreation = {
      // Missing required fields, for example, status
      // Add any other missing or invalid fields based on your application's requirements
      status: undefined,
      // Or invalid 'status':
      // status: 'InvalidStatus',
    };

    // Use try/catch to handle potential rejections
    try {
      const application = await createApplications(invalidDataForCreation);
      // If the above line doesn't throw an error, fail the test
      expect(application).toBeUndefined(); // Or any other appropriate assertion
    } catch (error) {
      // Expect an error to be thrown, indicating that invalid data is handled
      expect(error).toBeDefined();
    }
  });

  // ...

  // should NOT find a single application with invalid ID
  it('should not find a single application with invalid ID', async () => {
    const invalidApplicationId = 'invalidID';

    // Use try/catch to handle potential rejections
    try {
      const application = await find_single_Application(invalidApplicationId);
      // If the above line doesn't throw an error, fail the test
      expect(application).toBeUndefined(); // Or any other appropriate assertion
    } catch (error) {
      // Expect an error to be thrown, indicating that invalid ID is handled
      expect(error).toBeDefined();
    }
  });

  // ...

  // should NOT update an application with invalid data
  it('should not update an application with invalid data', async () => {
    // Create a sample application to be updated
    const createdApplication = await createSingleApplication(data2);

    const invalidDataForUpdate = {
      // Invalid status, for example, a status that doesn't conform to your application's allowed values
      // Add any other invalid fields based on your application's requirements
      status: 'InvalidStatus',
    };

    // Use try/catch to handle potential rejections
    try {
      const updatedApplication = await updateApplication(
        createdApplication.id,
        invalidDataForUpdate,
      );
      // If the above line doesn't throw an error, fail the test
      expect(updatedApplication).toBeUndefined(); // Or any other appropriate assertion
    } catch (error) {
      // Expect an error to be thrown, indicating that invalid data is handled
      expect(error).toBeDefined();
    }
  });

  // ...

  // should NOT delete an application with invalid ID
  it('should not delete an application with invalid ID', async () => {
    const invalidApplicationId = 'invalidID';

    // Use try/catch to handle potential rejections
    try {
      const application = await deleteApplication(invalidApplicationId);
      // If the above line doesn't throw an error, fail the test
      expect(application).toBeUndefined(); // Or any other appropriate assertion
    } catch (error) {
      // Expect an error to be thrown, indicating that invalid ID is handled
      expect(error).toBeDefined();
    }
  });
  it('should delete the single application in the data object', async () => {
    const application = await deleteApplication(data2.id);
    expect(application).not.toBeNull();
  });
  // ...
});
