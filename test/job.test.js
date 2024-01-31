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
const { job } = require('../utils/prisma');

//  before all test make sure we are connecting to prisma
beforeAll(async () => {
  await prisma.$connect();
});
//  after all tests make sure we are disconnecting from prisma
afterAll(async () => {
  await prisma.$disconnect();
});

describe('job  operations', () => {
 
 
    it('should   create a job ', async () => {
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
    const job = await createJob(data);
    expect(job).not.toBeNull();
  });

  it('should  get all jobs avalable', async () => {
    const jobs = await getJobs();
    expect(jobs).not.toBeNull();
  });
});

it('should get single job', async ()=>{
    const id = '21278234skdf@#$@$jkbasdf@#$'
    const jobs = await get_single_job(
        id
    )
    expect(job).not.toBeNull();
 })


it('should delete all jobs after testing', async ()=>{
    const id = '21278234skdf@#$@$jkbasdf@#$'
    const deleteJob = await removeJob(
        id
    );
    expect(deleteJob).not.toBeNull()
 });

 




