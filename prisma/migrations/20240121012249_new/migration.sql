/*
  Warnings:

  - You are about to drop the column `userId` on the `job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_userId_fkey";

-- AlterTable
ALTER TABLE "job" DROP COLUMN "userId";
