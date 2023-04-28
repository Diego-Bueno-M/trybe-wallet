import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return 0;
    }
    expenses.forEach((expense) => {
      if (!expense.currency) expense.currency = 'USD';
      if (!expense.method) expense.method = 'Dinheiro';
      if (!expense.tag)expense.tag = 'Alimentação';
    });
    const valueWithCurrency = expenses.map(({ value, currency, exchangeRates }) => (
      Number(value) * Number(exchangeRates[currency].ask)));
    const total = valueWithCurrency.reduce((accumulator, curr) => accumulator + curr);
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header id="wallet-header">
        TrybeWallet
        <div id="email-container">
          <p className="field-title">Email:</p>
          <p data-testid="email-field">{email}</p>
        </div>
        <div id="total-container">
          <p className="field-title">Total de despesas:</p>
          <p data-testid="total-field">{this.sumExpenses()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
