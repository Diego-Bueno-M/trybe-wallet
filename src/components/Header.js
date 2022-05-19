import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      return 0;
    }
    const valueWithCurrency = expenses.map(({ value, currency, exchangeRates }) => (
      Number(value) * Number(exchangeRates[currency].ask)));
    const total = valueWithCurrency.reduce((accumulator, curr) => accumulator + curr);
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        TrybeWallet
        <span data-testid="email-field">{email}</span>
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">{this.sumExpenses()}</p>
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
