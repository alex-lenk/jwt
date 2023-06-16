export const getFromStorage = (key: any) => {
  return localStorage.getItem(key);
};

export const saveToStorage = (key: any, value: any) => {
  localStorage.setItem(key, value);
};

export const removeFromStorage = (key: any) => {
  localStorage.removeItem(key);
};
