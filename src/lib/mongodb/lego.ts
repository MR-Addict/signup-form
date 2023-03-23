import { ObjectId } from "mongodb";

import type { LegoUserType } from "@/types";
import clientPromise from "./clientPromise";

async function insert(user: LegoUserType) {
  try {
    const client = await clientPromise;
    const db = client.db("vistalab");

    if (user._id) {
      const userCopy = Object.assign({}, user);
      delete userCopy._id;
      const result = await db
        .collection("lego")
        .replaceOne({ _id: new ObjectId(user._id) }, userCopy, { upsert: true });

      if (result.modifiedCount) return { status: true, message: user.name + "，你的信息修改成功" };
      else return { status: true, message: user.name + "，你的信息没有任何变动" };
    } else {
      //@ts-expect-error
      const result = await db.collection("lego").insertOne({ ...user });
      if (result.insertedId) return { status: true, message: "报名成功", uuid: result.insertedId.toString() };
      else return { status: false, message: "报名失败" };
    }
  } catch (error) {
    console.error(error);
    return { status: false, message: "数据库通信失败" };
  }
}

async function query() {
  try {
    const client = await clientPromise;
    const db = client.db("vistalab");
    // @ts-expect-error
    const result: LegoUserType[] = await db
      .collection("lego")
      .find({})
      .map((item) => ({ ...item, _id: item._id.toString() }))
      .toArray();

    return { status: true, data: result };
  } catch (error) {
    console.error(error);
    return { status: false, message: "数据库通信失败" };
  }
}

const lego = {
  insert,
  query,
};

export default lego;
