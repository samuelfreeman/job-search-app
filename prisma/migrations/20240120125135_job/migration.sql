-- AlterTable
ALTER TABLE "job" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "salaryRange" DROP NOT NULL,
ALTER COLUMN "noOfPositions" DROP NOT NULL,
ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "experience" DROP NOT NULL;
