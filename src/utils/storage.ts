export const saveToStorage = (key: string, value: any, useSession = false) => {
    const storage = useSession ? sessionStorage : localStorage;
    storage.setItem(key, value);
};

export const getFromStorage = (key: string, useSession = false): any => {
    const storage = useSession ? sessionStorage : localStorage;
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : null;
};

export const removeFromStorage = (key: string, useSession = false) => {
    const storage = useSession ? sessionStorage : localStorage;
    storage.removeItem(key);
};



export const saveFavoritesForUser = (userId: string, favorites: string[]) => {
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
};

export const getFavoritesForUser = (userId: string): string[] => {
    const data = localStorage.getItem(`favorites_${userId}`);
    return data ? JSON.parse(data) : [];
};

export const clearFavoritesOnLogout = () => {
    localStorage.removeItem("current_favorites"); 
};
