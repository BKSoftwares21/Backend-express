import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createUser, findUserByEmail } from "../controllers/user.controller";
import _userRepository from "../../repository/user.repository";

const UserRouter = Router();

// @ts-ignore
UserRouter.post("/", asyncHandler(createUser(_userRepository)));
// @ts-ignore
UserRouter.get("/:email", asyncHandler(findUserByEmail(_userRepository)));

export default UserRouter;
