import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Bookmark {
  id: string;
  module: string;
  moduleName: string;
  title: string;
  excerpt: string;
  href: string;
  tags: string[];
  createdAt: number;
  notes?: string;
}

export interface ReadingHistory {
  id: string;
  module: string;
  moduleName: string;
  title: string;
  href: string;
  timestamp: number;
  progress?: number;
}

export interface UserPreferences {
  theme: 'dark' | 'mystic' | 'ancient' | 'ancient-paper';
  fontSize: 'small' | 'medium' | 'large';
  readingProgress: boolean;
}

interface UserStore {
  bookmarks: Bookmark[];
  history: ReadingHistory[];
  preferences: UserPreferences;

  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  updateBookmarkNotes: (id: string, notes: string) => void;

  addHistory: (item: Omit<ReadingHistory, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;

  setTheme: (theme: UserPreferences['theme']) => void;
  setFontSize: (size: UserPreferences['fontSize']) => void;
  setReadingProgress: (enabled: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      bookmarks: [],
      history: [],
      preferences: {
        theme: 'dark',
        fontSize: 'medium',
        readingProgress: true,
      },

      addBookmark: (bookmark) => {
        const newBookmark: Bookmark = {
          ...bookmark,
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          createdAt: Date.now(),
        };
        set((state) => ({
          bookmarks: [newBookmark, ...state.bookmarks],
        }));
      },

      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }));
      },

      updateBookmarkNotes: (id, notes) => {
        set((state) => ({
          bookmarks: state.bookmarks.map((b) =>
            b.id === id ? { ...b, notes } : b
          ),
        }));
      },

      addHistory: (item) => {
        const newHistory: ReadingHistory = {
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          timestamp: Date.now(),
        };
        set((state) => ({
          history: [newHistory, ...state.history.filter(h => h.href !== item.href)].slice(0, 50),
        }));
      },

      clearHistory: () => {
        set({ history: [] });
      },

      setTheme: (theme) => {
        set((state) => ({
          preferences: { ...state.preferences, theme },
        }));
      },

      setFontSize: (fontSize) => {
        set((state) => ({
          preferences: { ...state.preferences, fontSize },
        }));
      },

      setReadingProgress: (readingProgress) => {
        set((state) => ({
          preferences: { ...state.preferences, readingProgress },
        }));
      },
    }),
    {
      name: 'lingxu-user-store',
    }
  )
);
