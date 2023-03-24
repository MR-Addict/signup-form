import { v4 as uuidv4 } from "uuid";
import { Document, UpdateResult } from "mongodb";

import type { LegoUserType } from "@/types";
import clientPromise from "./clientPromise";

function Response(user: LegoUserType, result: Document | UpdateResult) {
  // Check if a document was inserted
  if (result.upsertedCount > 0) return { status: true, message: "报名成功" };
  // Check if a document was updated
  else if (result.matchedCount > 0 && result.modifiedCount > 0) {
    return { status: true, message: user.name + "，你的信息修改成功" };
  }
  // Check if no document was modified
  else if (result.matchedCount > 0 && result.modifiedCount === 0) {
    return { status: true, message: user.name + "，你的信息没有任何变动" };
  }
  // Handle other cases (e.g. no document was found)
  else {
    return { status: false, message: "未找到数据" };
  }
}

async function insert(user: LegoUserType) {
  try {
    const client = await clientPromise;
    const db = client.db("vistalab");
    const groupId = uuidv4();

    const result = await db
      .collection("lego")
      .replaceOne({ userId: user.userId }, user.leader === "是" ? { ...user, groupId } : user, { upsert: true });

    return Response(user, result);
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
    const result = await db.collection("lego").replaceOne({ userId: user.userId }, user, { upsert: true });

    return Response(user, result);
  } catch (error) {
    console.error(error);
    return { status: false, message: "数据库通信失败" };
  }
}

async function signupUserAndGroups(userId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("vistalab");
    const user: any = await db.collection("lego").findOne({ userId });

    const groups = await db
      .collection("lego")
      .find({ leader: "是" })
      .map((item) => ({ groupId: item.groupId, group: item.group, type: item.type }))
      .toArray();

    if (user) delete user._id;
    return { status: true, data: { user, groups } };
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
  signupUserAndGroups,
};

export default lego;
