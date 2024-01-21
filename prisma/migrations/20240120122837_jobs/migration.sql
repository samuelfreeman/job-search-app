/*
  Warnings:

  - You are about to drop the column `cartegoryId` on the `job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_cartegoryId_fkey";

-- AlterTable
ALTER TABLE "job" DROP COLUMN "cartegoryId",
ALTER COLUMN "industry" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_industry_fkey" FOREIGN KEY ("industry") REFERENCES "cartegory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
