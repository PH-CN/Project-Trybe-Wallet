import React from "react";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <h2 data-testid="email-field">{userEmail}</h2>
        <h4 data-testid="total-field">0</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Header);
