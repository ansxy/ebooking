import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { User } from "@prisma/client";

type Data = {
  status: string;
  data?: User[];
  message?: any;
};

const allowedMethods = ["GET", "PUT", "DELETE", "POST"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (!allowedMethods.includes(req.method!)) {
      return res
        .status(405)
        .send({ status: "fail ", message: "Method not allowd" });
    } else {
      if (req.method === "GET") {
        const allUser = await prisma.user.findMany({
          include: {
            balance: true,
          },
        });
        res.status(200).json({ status: "success", data: allUser });
      }
      if (req.method === "DELETE") {
        await prisma.user.delete({
          where: {
            email: req.body.email,
          },
        });
        res.status(200).send({
          status: "success",
          message: "data berhasil dihapus",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ status: "fail", message: error });
  }
}
