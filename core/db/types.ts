export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  location?: string;
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
}

