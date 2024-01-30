/*
  Warnings:

  - Added the required column `status` to the `application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('Submitted', 'Accepted', 'Declined');

-- AlterTable
ALTER TABLE "application" DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL;
