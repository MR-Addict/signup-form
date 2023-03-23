import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

import type { LegoUserType } from "@/types";
import clientPromise from "./clientPromise";

async function insert(user: LegoUserType) {
  try {
    const client = await clientPromise;
    const db = client.db("vistalab");
    const groupId = uuidv4();

    //@ts-expect-error
    const result = await db.collection("lego").insertOne(user.leader === "是" ? { ...user, groupId } : user);
    if (result.insertedId) return { status: true, message: "报名成功", uuid: result.insertedId.toString() };
    else return { status: false, message: "报名失败" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "数据库通信失败" };
  }
}

async function update(user: LegoUserType) {
  try {
    const client = await clientPromise;
    const db = client.db("vistalab");

    // update group name and group type
    if (user.leader === "是")
      await db
        .collection("lego")
        .updateMany({ groupId: user.groupId }, { $set: { group: user.group, type: user.type } });

    // update user infomation
    const userCopy = Object.assign({}, user);
    delete userCopy._id;
    const result = await db.collection("lego").replaceOne({ _id: new ObjectId(user._id) }, userCopy, { upsert: true });

    if (result.modifiedCount) return { status: true, message: user.name + "，你的信息修改成功" };
    else return { status: true, message: user.name + "，你的信息没有任何变动" };
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
  update,
  query,
};

export default lego;
