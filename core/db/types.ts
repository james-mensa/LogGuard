import { Model } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  geoLocation?: string;
  ip?: string;
  image?: string;
  flag?: string;
  city?: string;
  region?: string;
  region_code?: string;
  region_type?: string;
  country_name?: string;
  country_code?: string;
  continent_name?: string;
  continent_code?: string;
  latitude?: number;
  longitude?: number;
  warning?: number;
  active?: boolean;
  // Add custom methods here
  comparePassword(pass: string): Promise<boolean>;
  generateToken(): string;
}

export interface UserModel extends Model<IUser> {}
export interface UserAuthInfo {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
}
