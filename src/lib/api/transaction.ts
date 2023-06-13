import prisma from "../prisma";
import axios from "axios";

export default async function transaction(
  email: string,
  id: string,
  balance: number,
  type: String
) {
  const api = process.env.FLIGHT_URL;

  if (type === "FLIGHT") {
    const response = await axios.get(`${api}flight/get-flight-byid/${id}`);
    if (balance > response.data.data.price) {
      try {
        const updateBalance = prisma.user.update({
          where: {
            email: email,
          },
          data: {
            balance: {
              update: {
                amount: {
                  decrement: response.data.data.price,
                },
              },
            },
          },
          select: {
            id: true,
            email: true,
            name: true,
          },
        });
        const transaction = prisma.transaction.create({
          data: {},
        });
        const createFlightTransaction = prisma.flighttransaction.create({
          data: {
            userid: (await updateBalance).id,
            flightid: id as string,
            transactionId: (await transaction).id,
          },
        });
        const result = await prisma.$transaction([
          updateBalance,
          transaction,
          createFlightTransaction,
        ]);
        return result;
      } catch (error) {
        return error;
      }
    } else {
      return "Saldo anda tidak mencukupi";
    }
  }
  if (type === "ROOM") {
    const response = await axios.get(
      `http://localhost:3002/room/hotel-by-did/cli4w3fz00001cm490h98x9fa`
    );
    if (balance > response.data.data.price_per_night) {
      try {
        const updateBalance = prisma.user.update({
          where: {
            email: email,
          },
          data: {
            balance: {
              update: {
                amount: {
                  decrement: response.data.data.price_per_night,
                },
              },
            },
          },
          select: {
            id: true,
            email: true,
            name: true,
          },
        });
        const transaction = prisma.transaction.create({
          data: {},
        });

        const createRoomTransaction = prisma.roomtransaction.create({
          data: {
            userid: (await updateBalance).id,
            roomid: id as string,
            transactionId: (await transaction).id,
          },
        });
        const result = await prisma.$transaction([
          updateBalance,
          transaction,
          createRoomTransaction,
        ]);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    } else {
      return "Saldo anda tidak mencukupi";
    }
  }
}
