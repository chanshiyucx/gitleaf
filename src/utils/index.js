export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

export const localRead = (key, defaultValue = '') => {
  return localStorage.getItem(key) || defaultValue
}
