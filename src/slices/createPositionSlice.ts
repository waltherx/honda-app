import { StateCreator } from 'zustand';
import { PositionData } from '../types';

export interface PositionSlice {
    positions: PositionData[];
    addToPositions: (position: PositionData) => void;
    removeFromPositions: (id: number) => void;
    //changeAmount: (id: number, amount: number) => void;
    clearPositions: () => void;
}

export const createPositionSlice: StateCreator<PositionSlice> = (set, get) => ({
    positions: [],
    addToPositions: (position: PositionData) => {
        const positions = get().positions;
        set({ positions: [...positions, position] });
    },
    removeFromPositions: (id: number) => {
        const positions = get().positions;
        set({ positions: positions.filter((position) => position.id !== id) });
    },
    /*changeAmount: (id: number, amount: number) => {
        const positions = get().positions;
        set({ positions: positions.map((position) => (position.id === id ? { ...position, amount } : position)) });
    },*/
    clearPositions: () => {
        set({ positions: [] });
    },
});
