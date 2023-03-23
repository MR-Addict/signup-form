import cookie from "cookie";

import type { NextApiRequest, NextApiResponse } from "next";

import { LegoUser } from "@/types";
import { lego } from "@/lib/mongodb";

function setCookie(req: NextApiRequest, res: NextApiResponse, cookieValue: string) {
  const cookieName = "lego.uuid";
  const legoUuidCookie = cookie.parse(req.headers.cookie || "")[cookieName];

  if (legoUuidCookie) return;
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(cookieName, cookieValue, {
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

  // return res.json({ status: false, message: "对不起，你提交的信息不合法" });

  const result = await lego.insert(parsedResult.data);
  if (result.uuid) setCookie(req, res, result.uuid);
  return res.status(result.status ? 200 : 500).json(result);
}
