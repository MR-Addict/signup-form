import type { NextApiRequest, NextApiResponse } from "next";

import { lego } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await lego.signupUserAndGroups("641c4fcb81f51a6dccb22c3a");

  return res.status(result.status ? 200 : 500).json(result);
}
