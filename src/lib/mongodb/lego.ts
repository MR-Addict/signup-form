import type { LegoUserType } from "@/types";
import clientPromise from "./clientPromise";

async function insert(user: LegoUserType) {
  try {
    const client = await clientPromise;
    const db = client.db("vistalab");

    const isSubmitToday = await db
      .collection("lego")
      .replaceOne({ name: user.name }, { create_date: new Date(), ...user }, { upsert: true });

    if (isSubmitToday.upsertedCount) return { status: true, message: "报名成功" };
    else if (isSubmitToday.modifiedCount) return { status: true, message: user.name + "，你的信息修改成功" };
    else return { status: false, message: "报名失败" };
  } catch (error) {
    return { status: false, message: "数据库连接失败" };
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
    return { status: false, message: "Cannot establish connection with mongodb!" };
  }
}

const lego = {
  insert,
  query,
};

export default lego;
