import React from "react";
import { connect } from "react-redux";
import { addCurrencies, addExpense } from "../actions";

export const URL = 'https://economia.awesomeapi.com.br/json/all';

class ExpenseForm extends React.Component {

  handleClick = async () => {
    const { currentState,
      addExpenseToStore,
      resetValue,
      addExchangeRates,
      updateId,
     } = this.props;
    const response = await fetch(URL);
    const json = await response.json();
    addExchangeRates(json);
    addExpenseToStore(currentState);
    updateId();
    resetValue();
  }

  render() {
    const { handleChange, currentState, currencies } = this.props;
    return (
      <section>
        <label htmlFor="value">
          Valor:
          <input
          onChange={ handleChange }
          data-testid="value-input"
          name="value"
          id="value"
          type="number"
          value={ currentState.value }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
          onChange={ handleChange }
          data-testid="description-input"
          name="description"
          id="description"
          type="text"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
          onChange={ handleChange }
          data-testid="currency-input"
          name="currency"
          id="currency"
          >
            {
            currencies[0].keys.map((currency, i) => (
              currency !== 'USDT'
              && <option key={ `${currency}-${i}` }> {currency} </option>
            ))
            }
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select
          onChange={ handleChange }
          data-testid="method-input"
          name="payment"
          id="payment"
          >
            <option value="cash">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito  </option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
          onChange={ handleChange }
          data-testid="tag-input"
          name="tag"
          id="tag"
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <button
        onClick={ this.handleClick }
        type="submit"
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpenseToStore: (object) => dispatch(addExpense(object)),
  addCurrenciesToSTore: (data) => dispatch(addCurrencies(data)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
