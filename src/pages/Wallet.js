import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addCurrencies, addExpense, removeExpense } from '../actions';

const URL = 'https://economia.awesomeapi.com.br/json/all';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  async componentDidMount() {
    const { addCurrenciesToStore } = this.props;
    this.resetId();
    const response = await fetch(URL);
    const data = await response.json();
    delete data.USDT;
    addCurrenciesToStore(data);
  }

  resetId = () => {
    this.setState({ id: 0 });
  }

  handleClick = async () => {
    const { addExpenseToStore } = this.props;
    const response = await fetch(URL);
    const json = await response.json();
    delete json.USDT;
    this.addExchangeRates(json);
    addExpenseToStore(this.state);
    this.updateId();
    this.resetValue();
  }

  resetValue = () => {
    this.setState({ value: '' });
  };

  addExchangeRates = (json) => {
    this.setState({ exchangeRates: json });
  }

  updateId = () => {
    const { id } = this.state;
    this.setState({ id: id + 1 });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { value } = this.state;
    const { currencies, expenses, excludeExpense } = this.props;
    const filteredCurrencies = Object.keys(currencies).filter((e) => e !== 'USDT');
    return (
      <>
        <Header />
        <section>
          <label htmlFor="value">
            Valor:
            <input
              onChange={ this.handleChange }
              data-testid="value-input"
              name="value"
              id="value"
              type="number"
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descri????o:
            <input
              onChange={ this.handleChange }
              data-testid="description-input"
              name="description"
              id="description"
              type="text"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              onChange={ this.handleChange }
              data-testid="currency-input"
              name="currency"
              id="currency"
            >
              {filteredCurrencies.map((currency) => (
                <option
                  value={ currency }
                  key={ currency }
                >
                  { currency }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            M??todo de pagamento:
            <select
              onChange={ this.handleChange }
              data-testid="method-input"
              name="method"
              id="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cart??o de cr??dito">Cart??o de cr??dito</option>
              <option value="Cart??o de d??bito">Cart??o de d??bito  </option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              onChange={ this.handleChange }
              data-testid="tag-input"
              name="tag"
              id="tag"
            >
              <option value="Alimenta????o">Alimenta????o</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Sa??de">Sa??de</option>
            </select>
          </label>
          <button
            onClick={ this.handleClick }
            type="submit"
          >
            Adicionar despesa
          </button>
        </section>
        <table>
          <thead>
            <tr>
              <th>Descri????o</th>
              <th>Tag</th>
              <th>M??todo de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>C??mbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de convers??o</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
                <td>
                  {
                    Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>
                <td>
                  {
                    (Number(expense.value) * expense.exchangeRates[expense.currency]
                      .ask).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => excludeExpense(expense) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpenseToStore: (object) => dispatch(addExpense(object)),
  addCurrenciesToStore: (data) => dispatch(addCurrencies(data)),
  excludeExpense: (expense) => dispatch(removeExpense(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  addCurrenciesToStore: PropTypes.func,
  addExpenseToStore: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
