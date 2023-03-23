import { compare as bcryptjsCompare } from "bcryptjs";

import clientPromise from "./clientPromise";

async function compare(username: string, password: string) {
  try {
    const client = await clientPromise;
    const db = client.db("user");

    const user = await db
      .collection("user")
      .aggregate([{ $match: { username } }, { $addFields: { _id: { $convert: { input: "$_id", to: "string" } } } }])
      .next();

    if (!user) return { status: false, message: "用户不存在" };

    const isMatched = await bcryptjsCompare(password, user.password);
    if (!isMatched) return { status: false, message: "密码错误" };

    delete user.password;
    return { status: true, user };
  } catch (error) {
    console.error(error);
    return { status: false, message: "数据库通信失败" };
  }
}
const user = {
  compare,
};

export default user;
