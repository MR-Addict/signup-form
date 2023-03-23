import { hash } from "bcryptjs";
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

async function register(username: string, password: string, role: "admin" | "maintainer" | "user") {
  const hashedPassword = await hash(password, 10);
  const now = new Date();

  try {
    const client = await clientPromise;
    const db = client.db("user");

    const duplicatedUser = await db.collection("vistalab").find({ username }).next();
    if (duplicatedUser) return { status: false, message: "用户名已被使用" };

    const result = await db
      .collection("vistalab")
      .insertOne({ username, passwrod: hashedPassword, role, create_time: now, update_time: now });

    if (result.insertedId) return { status: true, message: "注册成功" };
    else return { status: false, message: "注册失败" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "数据库通信失败" };
  }
}

const user = {
  compare,
  register,
};

export default user;
