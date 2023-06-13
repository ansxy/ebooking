import prisma from "../lib/prisma";

export default async function UpdateBalance(email: string, price: number) {
  try {
    const updateBalance = prisma.user.update({
      where: {
        email: email,
      },
      data: {
        balance: {
          update: {
            amount: {
              decrement: price,
            },
          },
        },
      },
    });
    return updateBalance;
  } catch (error) {
    return error;
  }
}

module.exports = UpdateBalance;
