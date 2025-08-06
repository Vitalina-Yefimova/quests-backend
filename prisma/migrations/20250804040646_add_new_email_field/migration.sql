/*
  Warnings:

  - A unique constraint covering the columns `[newEmail]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "newEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_newEmail_key" ON "public"."Users"("newEmail");
