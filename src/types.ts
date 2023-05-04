import z from "zod";

const LegoUser = z.object({
  name: z.string().min(2).max(10),
  gender: z.enum(["男", "女"]),
  studentId: z.string().length(12),
  phone: z.string().length(11),
  email: z.string().email().max(30),
  college: z.string().max(20),
  leader: z.enum(["是", "否"]),
  group: z.string().max(10),
  groupId: z.string().optional(),
  userId: z.string().length(24),
  type: z.enum(["专业组", "创意组", "创意专业兼报", ""]),
});

type LegoUserType = z.TypeOf<typeof LegoUser>;

export { LegoUser };
export type { LegoUserType };
