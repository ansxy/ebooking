import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bycrpt from "bcrypt";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bycrpt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: role,
        password: hashedPassword,
      },
    });
    return res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while creating your account" });
  }
}
