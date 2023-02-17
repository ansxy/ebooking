import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bycrpt from "bcrypt";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  const hashedPassword = await bycrpt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const session = await getSession({ req });
    if (session) {
      return res.status(200).json({ user });
    } else {
      return res.status(200).json({ message: "Success" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating your account" });
  }
}
