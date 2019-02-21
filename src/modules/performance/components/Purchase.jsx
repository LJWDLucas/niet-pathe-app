import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bookSeats, setPurchaseProperty } from '../actions/purchaseActions';
import InputLabelBox from '../../../composed/InputLabelBox';
import TitleList from './TitleList';
import BuyButton from './BuyButton';

class Purchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: false,
    };
    this.purchaseTickets = this.purchaseTickets.bind(this);
  }

  purchaseTickets() {
    const { email, purchaseTickets } = this.props;

    if (email.indexOf('@') === -1 || email.length <= 6) {
      return this.setState({ emailError: true });
    }

    this.setState({
      emailError: false
    });

    purchaseTickets();
  }

  render() {
    const { setName, name, setEmail, email } = this.props;
    const { emailError } = this.state;

    return (
      <div id="purchase" className="col-lg-5 col-md-6 col-sm-12 flex-wrap justify-content-center">
        <InputLabelBox onChange={setName} value={name} labelValue="Vul hier jouw naam in:" id="name" />
        <InputLabelBox hasError={emailError} onChange={setEmail} email={email} labelValue="Vul hier jouw e-mailadres in:" id="email" />
        <TitleList title="Jouw bestelling" />
        <BuyButton withClass="btn btn-success" onClick={this.purchaseTickets} value="Kopen" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.purchase.name,
  email: state.purchase.email,
});

const mapDispatchToProps = dispatch => ({
  purchaseTickets: () => dispatch(bookSeats()),
  setName: event => dispatch(setPurchaseProperty('name', event.target.value)),
  setEmail: event => dispatch(setPurchaseProperty('email', event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);

Purchase.propTypes = {
  purchaseTickets: PropTypes.func,
  setName: PropTypes.func,
  setEmail: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
};
