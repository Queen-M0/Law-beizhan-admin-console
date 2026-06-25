const TOKEN_KEY = 'law-beizhan-admin-token'
const USER_KEY = 'law-beizhan-admin-user'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUserStorage() {
  return localStorage.getItem(USER_KEY)
}

export function setUserStorage(user: string) {
  localStorage.setItem(USER_KEY, user)
}

export function clearUserStorage() {
  localStorage.removeItem(USER_KEY)
}
