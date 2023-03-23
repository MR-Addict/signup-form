import cookie from "cookie";

import type { NextApiRequest, NextApiResponse } from "next";

import { LegoUser } from "@/types";
import { lego } from "@/lib/mongodb";

function setCookie(res: NextApiResponse, cookieValue: string) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("lego.uuid", cookieValue, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 * 30,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  const parsedResult = LegoUser.safeParse(req.body);
  if (!parsedResult.success) return res.json({ status: false, message: "对不起，你提交的信息不合法" });

  const result = await lego.insert(parsedResult.data);
  if (result.uuid) setCookie(res, result.uuid);
  return res.status(result.status ? 200 : 500).json(result);
}
