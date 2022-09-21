const storage = {
  get: (key, defaultValue) => {
    const storageItem = JSON.parse(localStorage.getItem(key));
    return storageItem ? storageItem : defaultValue;
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
};

export default storage;
