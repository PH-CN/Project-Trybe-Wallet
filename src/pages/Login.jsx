import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      isEmailValid: false,
      isPasswordValid: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value }, () => this.verifyInfo());
  };

  verifyInfo = () => {
    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.setState({ isEmailValid: emailRegex.test(email) });
    if (password.length >= 6) {
      this.setState({ isPasswordValid: true });
    } else {
      this.setState({ isPasswordValid: false });
    }
  };

  render() {
    const { email, password, isEmailValid, isPasswordValid } = this.state;
    const { dispatchLogin, history } = this.props;
    return (
      <section>
        <input
          onChange={ this.handleChange }
          name="email"
          type="email"
          data-testid="email-input"
          value={ email }
        />
        <input
          onChange={ this.handleChange }
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
        />
        <button
          onClick={ () => {
            dispatchLogin(email);
            history.push('/carteira');
          } }
          disabled={ isPasswordValid && isEmailValid ? false : true }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (em) => dispatch(login(em)),
});

export default connect(null, mapDispatchToProps)(Login);
