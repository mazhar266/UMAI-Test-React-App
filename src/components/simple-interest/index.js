import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {updateSimpleInterest} from '../../actions/update-simple-interest';
import './index.css';

class SimpleInterest extends Component {
  constructor(props) {
    super(props);

    this.updatePrincipal = this.updatePrincipal.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.calculateInterest = this.calculateInterest.bind(this);
  }

  updatePrincipal = (event) => {
    this.props.updateSimpleInterest({
      principal: event.target.value,
      rate: this.props.simpleInterest.rate,
      time: this.props.simpleInterest.time,
      interest: this.props.simpleInterest.interest
    });
  }

  updateRate = (event) => {
    this.props.updateSimpleInterest({
      principal: this.props.simpleInterest.principal,
      rate: event.target.value,
      time: this.props.simpleInterest.time,
      interest: this.props.simpleInterest.interest
    });
  }

  updateTime = (event) => {
    this.props.updateSimpleInterest({
      principal: this.props.simpleInterest.principal,
      rate: this.props.simpleInterest.rate,
      time: event.target.value,
      interest: this.props.simpleInterest.interest
    });
  }

  calculateInterest = (event) => {
    event.preventDefault();
    let rate = this.props.simpleInterest.rate / 100;
    let interest = this.props.simpleInterest.principal * (1 + (rate * this.props.simpleInterest.time));

    this.props.updateSimpleInterest({
      principal: this.props.simpleInterest.principal,
      rate: rate,
      time: this.props.simpleInterest.time,
      interest: interest
    });

    return false;
  }

  render() {
    return (
      <div className="simple-interest">
        <h2>Simple Interest</h2>
        <form action="" method="post" onSubmit={this.calculateInterest}>
          <div className="form-group">
            <label htmlFor="principal">Principal (P): $</label>
            <input type="number" required min="0" className="form-control"
              id="principal" onChange={this.updatePrincipal} value={this.props.simpleInterest.principal}/>
          </div>
          <div className="form-group">
            <label htmlFor="rate">Rate (R): % (per year)</label>
            <input type="number" required min="0.1" max="100" step="0.01"
              className="form-control" id="rate" onChange={this.updateRate} value={this.props.simpleInterest.rate}/>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time (t) (in year):</label>
            <input type="number" min="1" required className="form-control"
              id="time" onChange={this.updateTime} value={this.props.simpleInterest.time}/>
          </div>
          <button type="submit" className="btn btn-primary form-control m-t">Calculate</button>
        </form>
        <h1 className="m-y">$ {this.props.simpleInterest.interest.toFixed(2)}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        simpleInterest: state.simpleInterest,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({updateSimpleInterest: updateSimpleInterest}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SimpleInterest);
