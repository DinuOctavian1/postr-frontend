import IUser from 'models/interfaces/IUser';
import { atom } from 'jotai';

const state = {
  user: atom<IUser | null>({
    username: '',
    email: '',
    twoFactorEnabled: false,
  }),
};

export default state;
