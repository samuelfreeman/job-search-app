/*
  Warnings:

  - Made the column `salaryRange` on table `job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "job" ALTER COLUMN "salaryRange" SET NOT NULL;
