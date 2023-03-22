import type { NextApiRequest, NextApiResponse } from "next";

import { LegoUser } from "@/types";
import { lego } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  const parsedResult = LegoUser.safeParse(req.body);
  if (!parsedResult.success) return res.json({ status: false, message: "Bad request" });

  const result = await lego.insert(parsedResult.data);
  return res.status(result.status ? 200 : 500).json(result);
}
