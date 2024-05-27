export function isAuthenticated(): boolean {
  const localStorageToken = localStorage.getItem('authToken');
  const sessionStorageToken = sessionStorage.getItem('authToken');

  return !!localStorageToken && !!sessionStorageToken;
}
