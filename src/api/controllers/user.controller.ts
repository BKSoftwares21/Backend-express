import { Request, Response } from "express";
import { UserRepository } from "@/repo/interfaces";
import { ErrorHandler } from "../middleware/error.middleware";
import userBusiness from "../../domain/user.business";

export const createUser = (_userRepository: UserRepository) => {
  return async (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || name === "") throw new ErrorHandler(400, "Name is required!");

    if (!email || email === "")
      throw new ErrorHandler(400, "Please provide email!");

    let user = {
      name,
      email,
    };

    // @ts-ignore - id will auto generate on creation
    const response = await userBusiness.createUser(_userRepository, user);

    return res.json({
      success: true,
      payload: response,
    });
  };
};

export const findUserByEmail = (_userRepository: UserRepository) => {
  return async (req: Request, res: Response) => {
    const { email } = req.params;

    if (!email || email === "")
      throw new ErrorHandler(400, "Please provide email!");

    const response = await userBusiness.findUserByEmail(_userRepository, email);

    return res.json({
      success: true,
      payload: response,
    });
  };
};
