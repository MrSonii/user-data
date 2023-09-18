export const getDataFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
};

export const setDataInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
