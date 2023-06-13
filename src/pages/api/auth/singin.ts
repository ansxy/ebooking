import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bycrpt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "user tidak ada" });
    } else {
      const valid = await bycrpt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json({ message: "user tidak ada" });
      }
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
