export interface User {
  id: number;
  email: string;
  password?: string;
  role: Role;
}

export interface UserDetail extends User {
  id: number;
  email: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}
