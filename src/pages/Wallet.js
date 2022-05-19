import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Forms from '../components/Forms';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Forms />
        <Table />
      </div>
    );
  }
}

export default connect()(Wallet);
