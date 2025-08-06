-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
