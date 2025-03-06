export const saveToStorage = (key: string, value: any, useSession = false) => {
    const storage = useSession ? sessionStorage : localStorage;
    storage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key: string, useSession = false): any => {
    const storage = useSession ? sessionStorage : localStorage;
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : null;
    // return value ? value : null;
};

export const removeFromStorage = (key: string, useSession = false) => {
    const storage = useSession ? sessionStorage : localStorage;
    storage.removeItem(key);
};