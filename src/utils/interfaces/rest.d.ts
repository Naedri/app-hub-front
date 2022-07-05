import type User from './user';

export type UserResponse = { user: User | null; error: ErrorClient | null };
