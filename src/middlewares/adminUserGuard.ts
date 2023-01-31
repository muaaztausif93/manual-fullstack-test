import { NextFunction, Request, Response } from "express";
import { UserType } from "../constants";
import userService from "../modules/users/user.service";

export const adminUserGuard = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getOneUser(req.user.email);
    if (user?.type === UserType.admin) {
        next();
    }else{
        return res.status(401).send({
           error: true,
           message: 'Sorry! you are not authorized to access this route',
       })
    }
}