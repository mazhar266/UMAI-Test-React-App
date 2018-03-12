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
    // check the rate first
    if (this.props.simpleInterest.rate < 0 || this.props.simpleInterest.rate > 100) {
      this.props.updateSimpleInterest({
        principal: this.props.simpleInterest.principal,
        rate: this.props.simpleInterest.rate,
        time: this.props.simpleInterest.time,
        interest: 'Invalid Rate'
      });
      return false;
    }

    // now check the principal
    if (this.props.simpleInterest.principal < 0) {
      this.props.updateSimpleInterest({
        principal: this.props.simpleInterest.principal,
        rate: this.props.simpleInterest.rate,
        time: this.props.simpleInterest.time,
        interest: 'Invalid Principal'
      });
      return false;
    }

    // now check the time
    if (this.props.simpleInterest.time < 0) {
      this.props.updateSimpleInterest({
        principal: this.props.simpleInterest.principal,
        rate: this.props.simpleInterest.rate,
        time: this.props.simpleInterest.time,
        interest: 'Invalid Time'
      });
      return false;
    }

    // calculate
    let rate = this.props.simpleInterest.rate / 100;
    let interest = this.props.simpleInterest.principal * (1 + (rate * this.props.simpleInterest.time));

    // set the values
    this.props.updateSimpleInterest({
      principal: this.props.simpleInterest.principal,
      rate: this.props.simpleInterest.rate,
      time: this.props.simpleInterest.time,
      interest: '$ ' + interest.toFixed(2)
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
            <input type="number" required min="0" max="100" step="0.01"
              className="form-control" id="rate" onChange={this.updateRate} value={this.props.simpleInterest.rate}/>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time (t) (in year):</label>
            <input type="number" min="0" required className="form-control"
              id="time" onChange={this.updateTime} value={this.props.simpleInterest.time}/>
          </div>
          <button type="submit" className="btn btn-primary form-control m-t">Calculate</button>
        </form>
        <h1 className="m-y">{this.props.simpleInterest.interest}</h1>
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
