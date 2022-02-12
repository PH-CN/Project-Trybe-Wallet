import { ADD_CURRENCIES, ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.obj],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses]
        .filter((el) => action.expense.id !== el.id),
    };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.data,
    };
  default:
    return {
      ...state,
    };
  }
};

export default wallet;
