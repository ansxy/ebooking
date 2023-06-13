import { NextApiRequest, NextApiResponse } from "next";

const allowMethods = ["GET"];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    if (id?.length === 1) {
      const response = await prisma.user.findUnique({
        where: {
          id: id[0],
        },
        select: {
          name: true,
          id: true,
          email: true,
          flightTransactions: {
            include: {
              flights: true,
            },
          },
        },
      });
      return res.status(200).json({ status: "success", data: response });
    }
  } catch (error) {}
}
