import type ErrorClient from './ErrorClient';
import type { PublicApplication, PrivateApplication } from './application';
import type User from './user';

export type UserToken = {
  sub: number;
  role: string;
  tokenUuid: string;
  iat: number;
  exp: number;
};
export type AuthResponse = { accessToken: string | null; error: ErrorClient | null };
export type UserResponse = { user: User | null; error: ErrorClient | null };

export type PublicAppResponse = { apps: PublicApplication[] | undefined; error: ErrorClient | null };
export type PrivateAppResponse = { apps: PrivateApplication[] | undefined; error: ErrorClient | null };

export type AccessResponse = { access: Access[] | undefined; error: ErrorClient | null };
