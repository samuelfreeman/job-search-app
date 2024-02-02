-- CreateEnum
CREATE TYPE "type" AS ENUM ('fullTime', 'partTime');

-- AlterTable
ALTER TABLE "job" ADD COLUMN     "jobType" "type" NOT NULL DEFAULT 'fullTime';
