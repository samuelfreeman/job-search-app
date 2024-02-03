const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {
  createJob,
  getJobs,
  queryJobs,
  get_single_job,
  removeJob,
  editJob,
} = require('../helpers/jobHelper');

//  before all test make sure we are connecting to prisma
beforeAll(async () => {
  await prisma.$connect();
});
//  after all tests make sure we are disconnecting from prisma
afterAll(async () => {
  await prisma.$disconnect();
});

const data = {
  id: '21278234skdf@#$@$jkbasdf@#$',
  title: 'IT consultant',
  description: ' Looking for tech enthusiasits',
  email: 'chippy@gmail.com',
  address: 'Ak-3672-273',
  salaryRange: '12,000-78,000k',
  noOfPositions: '56',
  company: 'Chippycode',
  experience: '2-5years of experience',
};

describe('job  operations', () => {
  //  create a job
  it('should   create a job ', async () => {
    const job = await createJob(data);
    expect(job).not.toBeNull();
  });
  // get all jobs
  it('should  get all jobs avalable', async () => {
    const jobs = await getJobs();
    expect(jobs).not.toBeNull();
  });
  // query for job
  it('should find a job based on the query', async () => {
    const job = await queryJobs(data.title);
    expect(job).not.toBeNull();
  });
  // edit a job
  it('should edit a job ', async () => {
    const job = await editJob(data.id, { salaryRange: '12,900-70,000k' });
    expect(job).not.toBeNull();
  });
  it('should get single job', async () => {
    const jobs = await get_single_job(data.id);
    expect(jobs).not.toBeNull();
  });

  it('should delete all jobs after testing', async () => {
    const deleteJob = await removeJob(data.id);
    expect(deleteJob).not.toBeNull();
  });
});
