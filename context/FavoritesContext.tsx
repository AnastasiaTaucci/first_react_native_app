import { createContext, useContext, useState, ReactNode } from 'react';

type Favorite = {
  title: string;
  description: string;
  group: string;
  link: string;
};

type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (item: Favorite) => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    addFavorite: () => {},
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  function addFavorite(item: Favorite) {
    setFavorites((prev) => [...prev, item]);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
}
