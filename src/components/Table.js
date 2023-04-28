import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';
import '../styles/Table.css';

class Table extends React.Component {
  getCurrency(exchangeRates, currency) {
    return Number(exchangeRates[currency].ask);
  }

  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <table
        id="table"
      >
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenses
          .map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>
                { this.getCurrency(expense.exchangeRates, expense.currency).toFixed(2) }
              </td>
              <td>
                { (this.getCurrency(expense.exchangeRates, expense.currency)
                * Number(expense.value)).toFixed(2) }
              </td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>Real</td>
              <td
                id="td-button"
              >
                <button
                  id="edit-button"
                  type="button"
                >
                  Editar
                </button>
                <button
                  id="delete-button"
                  type="button"
                  onClick={ () => deleteExpense(expense) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  deleteExpense: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (state) => {
    dispatch(removeExpense(state));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
