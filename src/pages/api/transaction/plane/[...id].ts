// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import transaction from "@/lib/api/transaction";

type Data = {
  name?: string;
  email?: String;
  createAt?: Date;
  data?: any;
  status?: string;
  message?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, balance, type } = req.body;
  const { id } = req.query;
  const newid = id && id[0];
  try {
    const result = await transaction(
      email,
      newid as string,
      parseInt(balance),
      type
    );
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(402).json({ data: error });
  }
}
