import { create } from 'zustand';
import { IUserSlice, createUserSlice } from './slices/createUserSlice';

type StoreState = IUserSlice;

export const useStore = create<StoreState>()((...a) => ({
    ...createUserSlice(...a),
}));
