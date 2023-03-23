import type { NextApiRequest, NextApiResponse } from "next";

import { LegoUser } from "@/types";
import { lego } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.setHeader("Allow", ["PUT"]).end(`Method ${req.method} is not allowed!`);

  const parsedResult = LegoUser.safeParse(req.body);
  if (!parsedResult.success) return res.json({ status: false, message: "对不起，你提交的信息不合法" });

  const result = await lego.update(parsedResult.data);
  return res.status(result.status ? 200 : 500).json(result);
}
