import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  getCurrency(exchangeRates, currency) {
    return Number(exchangeRates[currency].ask);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
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
          .map(({ currency, description, id, method, tag, value, exchangeRates }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ Number(value).toFixed(2) }</td>
              <td>{ this.getCurrency(exchangeRates, currency).toFixed(2) }</td>
              <td>
                { (this.getCurrency(exchangeRates, currency)
                * Number(value)).toFixed(2) }
              </td>
              <td>{ exchangeRates[currency].name }</td>
              <td>Real</td>
              <td><button type="button">Adicionar</button></td>
              <td><button type="button">Excluir</button></td>
            </tr>
          ))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
