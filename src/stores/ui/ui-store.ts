import { create } from 'zustand';

interface State {
    isOpenMenu: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isOpenMenu: false,
    openSideMenu: () => set({ isOpenMenu: true }),
    closeSideMenu: () => set({ isOpenMenu: false })
}))