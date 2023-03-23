import type { NextApiRequest, NextApiResponse } from "next";

import { user } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  if (!req.body.username || !req.body.password)
    return res.json({ status: false, message: "对不起，你提交的信息不合法" });

  const result = await user.register(req.body.username, req.body.password, "user");
  return res.status(result.status ? 200 : 500).json(result);
}
