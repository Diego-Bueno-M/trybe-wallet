import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoinsThunk, addExpenseThunk } from '../actions/index';

class Forms extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinsThunk());
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleClick = () => {
    const { dispatch, expenses } = this.props;
    const id = expenses.length;
    const stateWithId = { id, ...this.state };
    dispatch(addExpenseThunk(stateWithId));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
    });
  }

  render() {
    const { currencies } = this.props;
    const { value } = this.state;
    return (
      <div>
        <forms>
          <input
            type="text"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleInputChange }
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleInputChange }
          />
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              onChange={ this.handleInputChange }
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
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
          </select>
          <select name="tag" data-testid="tag-input" onChange={ this.handleInputChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </forms>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Forms.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Forms);
