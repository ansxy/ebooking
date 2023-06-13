/*
  Warnings:

  - Added the required column `address` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hotels"."Hotel" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "hotels"."Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hotels"."Service" ADD CONSTRAINT "Service_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "hotels"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
