import React from "react";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor() {
    super()

    this.state = {
      total: 0,
    }
  }
  render() {
    const { userEmail, expenses, currencies } = this.props;
    return (
      <header>
        <h2 data-testid="email-field">{userEmail}</h2>
        <h4 data-testid="total-field">
          {expenses
              .reduce((acc, expense) => acc + (
                expense.value * currencies[expense.currency].ask), 0)}
        </h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Header);
