import { create } from 'zustand';

type Lang = 'uz' | 'ru';

interface AppState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useAppStore = create<AppState>((set) => ({
  lang: 'uz',
  setLang: (lang) => set({ lang }),
}));
