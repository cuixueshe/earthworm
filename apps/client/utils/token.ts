export function getToken() {
  return localStorage.getItem('token')
}

export function checkHaveToken() {
  return getToken()
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function cleanToken() {
  localStorage.removeItem('token')
}
