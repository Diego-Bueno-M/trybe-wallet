import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoinsThunk } from '../actions/index';

class Forms extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinsThunk());
  }

  render() {
    const { currencies } = this.props;
    return (
      <forms>
        <input type="text" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
          >
            { currencies.map((currencie) => (
              <option
                key={ currencie }
                value={ currencie }
              >
                { currencie }
              </option>))}
          </select>
        </label>
        <select name="payment" data-testid="method-input">
          <option value="money">Dinheiro</option>
          <option value="debit">Cartão de débito</option>
          <option value="credit">Cartão de crédito</option>
        </select>
        <select name="tag" data-testid="tag-input">
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </forms>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Forms.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Forms);
