import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
import { logger } from "../logger";
import { ErrorHandler } from "../api/middleware/error.middleware";

const createUser = async (user: User): Promise<User> => {
  try {
    const response = await prisma.user.create({ data: user });

    return response;
  } catch (error: any) {
    logger.error(error); // should give enough info to debug
    // throw new Error("Something went wrong!");

    // Check Prisma Error docs to see what corresponding error refers to - https://www.prisma.io/docs/orm/reference/error-reference
    return error;
  }
};

const findUserByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    return user;
  } catch (error: any) {
    logger.error(error);

    return error;
  }
};

export default {
  createUser,
  findUserByEmail,
};
