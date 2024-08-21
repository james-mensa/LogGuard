import { IUser } from "../db/types"

export type IResponse={
    jwt?:string,
    status:string|number,
    msg:string
    user?:IUser
}
export type IPassReset={
    _id:string
    new_password:string
    old_password:string
}

export interface UserRegisterTy{
    email: string;
    password: string;
    lastname:string;
    firstname: string;
}
