import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ADD_EMAIL } from '../actions';

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
    dispatch(ADD_EMAIL(emailInput));
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
      <section>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          name="emailInput"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          name="passwordInput"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ this.emailValidation(emailInput)
            || this.passwordValidation(passwordInput) }
          onClick={ this.saveEmail }
        >
          Entrar
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.arrayOf.isRequired,
};

export default connect()(Login);
