// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const login = (userEmail) => ({
  type: LOGIN,
  userEmail,
});
