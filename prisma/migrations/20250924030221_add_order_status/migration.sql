-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."Orders" ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING';
