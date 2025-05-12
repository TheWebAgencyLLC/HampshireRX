export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export type UserRole = "user" | "admin";

export interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  DOB?: Date;
  address?: IAddress;
  phone?: string;
  role: UserRole;
}
