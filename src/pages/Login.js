import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../actions';
import money from '../images/money.webp';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  saveEmail() {
    const { dispatch, history } = this.props;
    const { emailInput } = this.state;
    dispatch(addEmail(emailInput));
    history.push('/carteira');
  }

  emailValidation(emailInput) {
    // regex para validação do email tirado do link => https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const emailValidation = /\S+@\S+\.\S+/;
    if (emailValidation.test(emailInput)) {
      return false;
    }
    return true;
  }

  passwordValidation(passwordInput) {
    const mimPasswordLength = 6;
    if (passwordInput.length >= mimPasswordLength) {
      return false;
    }
    return true;
  }

  render() {
    const { emailInput, passwordInput } = this.state;
    return (
      <div id="login-container">
        <section id="login-section">
          <h1>TrybeWallet</h1>
          <img id="money-img" alt="money" src={ money } />
          <div id="login-div">
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              data-testid="email-input"
              name="emailInput"
              onChange={ this.handleChange }
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              data-testid="password-input"
              name="passwordInput"
              onChange={ this.handleChange }
            />
            <button
              id="login-button"
              type="button"
              disabled={ this.emailValidation(emailInput)
                || this.passwordValidation(passwordInput) }
              onClick={ this.saveEmail }
            >
              Entrar
            </button>
          </div>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.arrayOf.isRequired,
};

export default connect()(Login);
