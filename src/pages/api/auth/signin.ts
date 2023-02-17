import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bycrpt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("Invalid email or password");
    } else {
      const valid = await bycrpt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid email or password");
      }
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
}
