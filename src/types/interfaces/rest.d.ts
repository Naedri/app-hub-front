import type ErrorClient from './ErrorClient';
import type Access from './access';
import type Application from './application';
import type User from './user';

export type UserResponse = { user: User | null; error: ErrorClient | null };

export type AppsResponse = { apps: Application[] | undefined; error: ErrorClient | null };
export type AccessResponse = { access: Access[] | undefined; error: ErrorClient | null };