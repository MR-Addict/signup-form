import z from "zod";

const LegoUser = z.object({
  _id: z.string().optional(),
  name: z.string(),
  gender: z.enum(["男", "女"]),
  studentId: z.string(),
  phone: z.string(),
  email: z.string().email(),
  college: z.string(),
  leader: z.enum(["是", "否"]),
  group: z.string(),
  type: z.enum(["专业赛", "创意赛", ""]),
});

type LegoUserType = z.TypeOf<typeof LegoUser>;

export { LegoUser };
export type { LegoUserType };
