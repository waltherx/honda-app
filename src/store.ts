import { create } from 'zustand';
import { UserSlice, createUserSlice } from './slices/createUserSlice';
import { PositionSlice, createPositionSlice } from './slices/createPositionSlice';

type StoreState = UserSlice & PositionSlice;

export const useStore = create<StoreState>()((...a) => ({
    ...createPositionSlice(...a),
    ...createUserSlice(...a),
}));
