import transaction from "@/lib/api/transaction";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id?: string;
  room_number?: number;
  price_per_night?: number;
  room_type?: string;
  hotelId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, balance, room_type, type } = req.body;
  const { id } = req.query;
  const newid = id && id[0];
  try {
    const result = await transaction(
      email,
      newid as string,
      parseInt(balance),
      type
    );
    return res
      .status(200)
      .json({
        data: result,
        nomor_kamar: `D-${Math.floor(Math.random() * 100) + 1}`,
      });
  } catch (error) {
    return res.status(402).json({ data: error });
  }
}
