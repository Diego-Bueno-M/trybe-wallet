import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Forms from '../components/Forms';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Forms />
      </div>
    );
  }
}

export default connect()(Wallet);
