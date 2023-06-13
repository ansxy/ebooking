-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "balance";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "flights";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "hotels";

-- CreateEnum
CREATE TYPE "user"."Role" AS ENUM ('ADMIN', 'PENGGUNA', 'MITRA');

-- CreateTable
CREATE TABLE "user"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "role" "user"."Role" NOT NULL,
    "airportId" TEXT,
    "hotelId" TEXT,
    "balanceId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flights"."Airpots" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Airpots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flights"."Flight" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "delayed_time" INTEGER,
    "deparatur_time" TIMESTAMP(3) NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "flight_type" TEXT NOT NULL,
    "airportId" TEXT NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels"."Hotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels"."Room" (
    "id" TEXT NOT NULL,
    "room_number" INTEGER NOT NULL,
    "price_per_night" INTEGER NOT NULL,
    "room_type" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balance"."Balance" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."Flighttransaction" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "flightid" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "Flighttransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."Roomtransaction" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "roomid" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "Roomtransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."Transaction" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_airportId_key" ON "user"."User"("airportId");

-- CreateIndex
CREATE UNIQUE INDEX "User_hotelId_key" ON "user"."User"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "User_balanceId_key" ON "user"."User"("balanceId");

-- CreateIndex
CREATE UNIQUE INDEX "Flighttransaction_transactionId_key" ON "user"."Flighttransaction"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Roomtransaction_transactionId_key" ON "user"."Roomtransaction"("transactionId");

-- AddForeignKey
ALTER TABLE "user"."User" ADD CONSTRAINT "User_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "flights"."Airpots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."User" ADD CONSTRAINT "User_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"."Hotel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."User" ADD CONSTRAINT "User_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "balance"."Balance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights"."Flight" ADD CONSTRAINT "Flight_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "flights"."Airpots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels"."Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"."Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Flighttransaction" ADD CONSTRAINT "Flighttransaction_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Flighttransaction" ADD CONSTRAINT "Flighttransaction_flightid_fkey" FOREIGN KEY ("flightid") REFERENCES "flights"."Flight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Flighttransaction" ADD CONSTRAINT "Flighttransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "user"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Roomtransaction" ADD CONSTRAINT "Roomtransaction_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Roomtransaction" ADD CONSTRAINT "Roomtransaction_roomid_fkey" FOREIGN KEY ("roomid") REFERENCES "hotels"."Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."Roomtransaction" ADD CONSTRAINT "Roomtransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "user"."Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
