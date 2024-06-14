/*
  Warnings:

  - Made the column `startDate` on table `Notes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "startDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "birthDate" DROP NOT NULL;
