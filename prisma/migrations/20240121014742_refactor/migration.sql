/*
  Warnings:

  - You are about to drop the column `telephone` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admin" DROP COLUMN "telephone";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "telephone";
