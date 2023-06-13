import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getToken } from "next-auth/jwt";

const allowedMethods = ["PUT"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, raw: false });
  const { amount, id, adminId } = req.body;
  if (token?.role === "ADMIN") {
    try {
      if (!allowedMethods.includes(req.method!)) {
        return res
          .status(405)
          .send({ status: "fail ", message: "Method not allowd" });
      } else {
        const updateBalance = await prisma.user.update({
          where: {
            id: id,
          },
          data: { 
            balance: {
              update: {
                amount: {
                  increment: parseInt(amount),
                },
              },
            },
          },
        });
        return res.status(200).json({ status: "success", data: updateBalance });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "fail", message: error });
    }
  } else {
    return res.status(403).send({ status: "fail", message: "Not Authorized" });
  }
}
