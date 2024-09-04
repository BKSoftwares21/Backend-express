import { UserRepository } from "@/repo/interfaces";
import { User } from "@prisma/client";

const createUser = async (
  _userRepository: UserRepository,
  user: User
): Promise<User> => {
  const res = await _userRepository.createUser(user);
  return res;
};

const findUserByEmail = async (
  _userRepository: UserRepository,
  email: string
): Promise<User | undefined> => {
  const res = await _userRepository.findUserByEmail(email);
  return res;
};

export default {
  createUser,
  findUserByEmail,
};
