import { ObjectId } from "mongodb";

import type { LegoUserType } from "@/types";
import clientPromise from "./clientPromise";

async function insert(user: LegoUserType) {
  try {
    const client = await clientPromise;
    const db = client.db("vistalab");

    const isSubmitToday = await db
      .collection("lego")
      .replaceOne({ name: user.name }, { create_date: new Date(), ...user }, { upsert: true });

    if (isSubmitToday.upsertedCount) return { status: true, message: "提交成功" };
    else if (isSubmitToday.modifiedCount) return { status: true, message: user.name + "，你的信息修改成功" };
    else return { status: false, message: "提交失败" };
  } catch (error) {
    return { status: false, message: "数据库连接失败" };
  }
}

async function update(_id: string, weather: string, moment: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db.collection("moments").updateOne({ _id: new ObjectId(_id) }, { $set: { moment, weather } });
    if (result.modifiedCount) return { status: true, message: "Update succeeded!" };
    else return { status: false, message: "Update failed!" };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

async function read() {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result: any[] = await db
      .collection("moments")
      .find({})
      .sort({ date: -1 })
      .map((item) => ({ ...item, _id: item._id.toString() }))
      .toArray();
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: "Error occurred while communicate with mongodb!" };
  }
}

async function remove(_id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("playground");

    const result = await db.collection("moments").deleteOne({ _id: new ObjectId(_id) });
    if (result.deletedCount > 0) return { status: true, message: "Delete succeeded!" };
    else return { status: false, message: "Delete failed!" };
  } catch (error) {
    return { status: false, message: "Cannot establish connection with mongodb!" };
  }
}

const lego = {
  insert,
  update,
  read,
  remove,
};

export default lego;
