import { GateWAY } from "@/core/lib/gate-way/mail";
import { IUser, UserAuthInfo } from "../db/types";
import { IPassReset, IResponse } from "@/core/common/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcryt from "bcrypt";
import { Utility } from "@/core/common/utils";
import { Models } from "../db";
require("dotenv").config();
const ACCOUNT_ACTIVATION = process.env.ACCOUNT_ACTIVATION;

export class UserManager {
  private static instance: UserManager;

  private constructor() {}

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  async preRegisterUser(user: UserAuthInfo): Promise<IResponse> {
    let response: IResponse = {
      msg: "",
      status: "",
    };
    const { firstname, lastname, email, password } = user;
    const check_user = await Models.User.findOne({ email: email });
    if (check_user) {
      response = {
        msg: "email used already!!",
        status: "error",
      };
      return response;
    }
    if (!ACCOUNT_ACTIVATION) {
      return response;
    }

    const signtoken = jwt.sign(
      { firstname, lastname, email, password },
      ACCOUNT_ACTIVATION,
      { expiresIn: "1d" }
    );
    try {
      await GateWAY.registerUser(firstname, email, signtoken);      
      console.log({ token:'token'})
    } catch (error) {
      console.log({ email:error})
    }

    response = {
      msg: "Registration successful, please check your email for activation link",
      status: "success",
    };
    return response;
  }
  async authUser(t: string, user: IUser): Promise<IResponse> {
    let response: IResponse = {
      msg: "",
      status: "",
    };
    try {
      if (!ACCOUNT_ACTIVATION) {
        return response;
      }
      const {firstname, lastname, email, password  } = jwt.verify(
        t,
        ACCOUNT_ACTIVATION
      ) as JwtPayload;

      console.log({ email, password,lastname, firstname})
      const check_user = await Models.User.findOne({ email: email });

      if (check_user) {
        response = {
          msg: "email verified or registered already!!",
          status: "error",
        };
        return response;
      }
const ___user=Utility.omit(user,["email","password","firstname","lastname"])
      const _user = new  Models.User({
        password,
        email,
        ...___user,
      });
     

      const save_user = await _user.save();

      const token = save_user.generateToken();
      response = {
        msg: "success",
        status: 200,
        jwt: token,
        user: save_user,
      };
    } catch (error) {
      response = {
        msg: "authentication error",
        status: "error",
      };

      console.log(error);
    }
    return response;
  }

  async getUsers(): Promise<IUser[]> {
    let response: IUser[] = [];
    try {
      const allusers = await Models.User.find({}).sort({ createdAt: "desc" });
      if (!allusers) {
      }
      if (allusers) {
        response = allusers;
      }
    } catch (error) {
      console.error(error);
    }

    return response;
  }

  async signIn(
    email: string,
    passsword: string
  ): Promise<IResponse | undefined> {
    try {
      //   const GeoData = GetGeo();

      //   console.log({ await: await GeoData });

      const user_ac = await Models.User.findOne({ email: email });
      console.log(email);

      if (user_ac) {
        if (!user_ac.active) {
          console.error("User is not active");
        }
        if (user_ac.active) {
          const matchpassword = await user_ac.comparePassword(passsword);
          if (matchpassword == true) {
            const updateD = await Models.User.findByIdAndUpdate(
              { _id: user_ac._id },
              {
                $set: {
                  //   ...(await GeoData),
                },
              },
              { new: true }
            );

            const token = user_ac.generateToken();
            console.log({ update: updateD });
            return {
              user: user_ac,
              jwt: token as string,
              status: 200,
              msg: "User authenticated successfully",
            };
          }
          if (matchpassword == false) {
            return {
              status: 401,
              msg: "User authentication failed",
            };
          }
        }
      }
      if (!user_ac) {
        return {
          status: 401,
          msg: "User not found",
        };
      }
    } catch (error) {
      return {
        status: 401,
        msg: `error: ${error}`,
      };
    }
    return undefined;
  }

  async updateUserInfo(_id: string, data: any): Promise<IResponse> {
    let res: IResponse = { status: 401, msg: "" };
    try {
      const updated_user = await Models.User.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            ...data,
          },
        },
        { new: true }
      );
      if(!updated_user){
return res;
      }
      res = {
        user: updated_user,
        status: 200,
        msg: "User updated successfully",
      };
    } catch (error) {
      res = {
        status: 400,
        msg: "erorr",
      };

      console.log(error);
    }
    return res;
  }

  async restrictUser(_id: string): Promise<IResponse> {
    let res: IResponse = { status: 401, msg: "" };

    try {
      const _user = await Models.User.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            active: false,
          },
        },
        { new: true }
      );
      if(!_user){
        return res
      }

      res = { status: 200, msg: "user restricted", user: _user };

      await GateWAY.Contactmail(
        _user.email,
        "you violated our terms and condition.you can contact our adminstrator to recover your account"
      );
      console.log({ updated: _user });
    } catch (error) {
      res = { status: 401, msg: "error" };
      console.log(error);
    }
    return res;
  }

  async unBlockUser(_id: string): Promise<IResponse> {
    let res: IResponse = { status: 401, msg: "" };

    try {
      const _user = await Models.User.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            active: true,
          },
        },
        { new: true }
      );
      if(!_user) {
        return res
      }
      res = { status: 200, msg: "user unblocked", user: _user };

      await GateWAY.Contactmail(
        _user.email,
        "please your account has been restored"
      );
      console.log({ updated: _user });
    } catch (error) {
      res = { status: 401, msg: "error" };
      console.log(error);
    }
    return res;
  }
  async passwordReset({
    _id,
    new_password,
    old_password,
  }: IPassReset): Promise<IResponse> {
    let res: IResponse = { status: 401, msg: "error" };
    try {
      const user_a = await Models.User.findById({ _id });
      if (user_a) {
        console.log(user_a);
        const matchpassword = await user_a.comparePassword(old_password);
        if (matchpassword == false) {
          res = { status: "400", msg: "Not Permitted ,password mismatch" };
          console.log("Not Permitted");
        }
        if (matchpassword == true) {
          const salt = await bcryt.genSalt(10);
          const hash = await bcryt.hash(new_password, salt);
          const _userUpdate = await Models.User.findOneAndUpdate(
            { _id },
            {
              $set: {
                password: hash,
              },
            },
            { new: true }
          );

          if(!_userUpdate){
            return res;
          }
          res = { status: 200, msg: "updated successfully", user: _userUpdate };
        }
      }
    } catch (error) {
      console.error(error);
      res = { status: 401, msg: "error" };
    }
    return res;
  }
  async passForgotLink(email: string): Promise<IResponse> {
    let res: IResponse = {
      status: 401,
      msg: "error",
    };
    try {
      const check_user = await Models.User.findOne({ email: email });
      if (!ACCOUNT_ACTIVATION) {
        return res;
      }
      if (check_user) {
        const _id = check_user._id;

        const token = jwt.sign({ _id }, ACCOUNT_ACTIVATION, {
          expiresIn: "1d",
        });
        await GateWAY.ResetPass(email, token);
        res = {
          msg: "Please check your email",
          status: 200,
        };
      }
      if (!check_user) {
        res = {
          msg: "Account not found",
          status: 400,
        };
      }
    } catch (error) {
      res = {
        msg: "Error",
        status: 401,
      };
    }

    return res;
  }
}
