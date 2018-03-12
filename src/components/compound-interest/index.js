import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {updateCompoundInterest} from '../../actions/update-compound-interest';
import './index.css';

class CompoundInterest extends Component {
  constructor(props) {
    super(props);

    this.updatePrincipal = this.updatePrincipal.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.calculateInterest = this.calculateInterest.bind(this);
  }

  updatePrincipal = (event) => {
    this.props.updateCompoundInterest({
      principal: event.target.value,
      rate: this.props.compoundInterest.rate,
      time: this.props.compoundInterest.time,
      interest: this.props.compoundInterest.interest
    });
  }

  updateRate = (event) => {
    this.props.updateCompoundInterest({
      principal: this.props.compoundInterest.principal,
      rate: event.target.value,
      time: this.props.compoundInterest.time,
      interest: this.props.compoundInterest.interest
    });
  }

  updateTime = (event) => {
    this.props.updateCompoundInterest({
      principal: this.props.compoundInterest.principal,
      rate: this.props.compoundInterest.rate,
      time: event.target.value,
      interest: this.props.compoundInterest.interest
    });
  }

  calculateInterest = (event) => {
    event.preventDefault();
    // first check the rate
    if (this.props.compoundInterest.rate < 0 || this.props.compoundInterest.rate > 100) {
      this.props.updateCompoundInterest({
        principal: this.props.compoundInterest.principal,
        rate: this.props.compoundInterest.rate,
        time: this.props.compoundInterest.time,
        interest: 'Invalid Rate'
      });
      return false;
    }

    // now check the principal
    if (this.props.compoundInterest.principal < 0) {
      this.props.updateCompoundInterest({
        principal: this.props.compoundInterest.principal,
        rate: this.props.compoundInterest.rate,
        time: this.props.compoundInterest.time,
        interest: 'Invalid Principal'
      });
      return false;
    }

    // now check the time
    if (this.props.compoundInterest.time < 0) {
      this.props.updateCompoundInterest({
        principal: this.props.compoundInterest.principal,
        rate: this.props.compoundInterest.rate,
        time: this.props.compoundInterest.time,
        interest: 'Invalid Time'
      });
      return false;
    }

    // calculate
    let rate = this.props.compoundInterest.rate / 100;
    let interest = this.props.compoundInterest.principal * Math.pow(1 + rate, this.props.compoundInterest.time);

    // set the values
    this.props.updateCompoundInterest({
      principal: this.props.compoundInterest.principal,
      rate: this.props.compoundInterest.rate,
      time: this.props.compoundInterest.time,
      interest: '$ ' + interest.toFixed(2)
    });

    return false;
  }

  render() {
    return (
      <div className="compound-interest">
        <h2>Compound Interest</h2>
        <form action="" method="post" onSubmit={this.calculateInterest}>
          <div className="form-group">
            <label htmlFor="principal">Principal (P): $</label>
            <input type="number" required min="0" className="form-control"
              id="principal" onChange={this.updatePrincipal} value={this.props.compoundInterest.principal}/>
          </div>
          <div className="form-group">
            <label htmlFor="rate">Rate (R): % (per year)</label>
            <input type="number" required min="0" max="100" step="0.01"
              className="form-control" id="rate" onChange={this.updateRate} value={this.props.compoundInterest.rate}/>
          </div>
          <div className="form-group">
            Compound (n): <span className="small-text">Annually (1/Yr)</span>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time (t) (in year):</label>
            <input type="number" min="0" required className="form-control"
              id="time" onChange={this.updateTime} value={this.props.compoundInterest.time}/>
          </div>
          <button type="submit" className="btn btn-primary form-control m-t">Calculate</button>
        </form>
        <h1 className="m-y">{this.props.compoundInterest.interest}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        compoundInterest: state.compoundInterest,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({updateCompoundInterest: updateCompoundInterest}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CompoundInterest);
