// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const login = (userEmail) => ({
  type: LOGIN,
  userEmail,
});

export const addExpense = (obj) => ({
  type: ADD_EXPENSE,
  obj,
});

export const addCurrencies = (data) => ({
  type: ADD_CURRENCIES,
  data,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  expense,
});
