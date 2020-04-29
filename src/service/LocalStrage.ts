// データ読み込み
export const loadData = <T>(key: string, defaultValue: T): T => {
  const temp = window.localStorage.getItem(key);
  if (temp !== null) {
    return JSON.parse(temp) as T;
  } else {
    return defaultValue;
  }
};

// データの書き出し
export const saveData = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
}
