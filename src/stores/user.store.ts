import { IUser } from '@/types/auth.types';
import { atom } from 'nanostores';

type TypeUser = IUser | null

export const userStore = atom<TypeUser>(null);

export function setUser(user: TypeUser) {
  userStore.set(user);
}