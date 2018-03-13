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
    this.updateCompound = this.updateCompound.bind(this);
    this.calculateInterest = this.calculateInterest.bind(this);
  }

  updatePrincipal = (event) => {
    this.props.updateCompoundInterest({
      principal: event.target.value,
      rate: this.props.compoundInterest.rate,
      time: this.props.compoundInterest.time,
      compound: this.props.compoundInterest.compound,
      error: false,
      interest: this.props.compoundInterest.interest
    });
  }

  updateRate = (event) => {
    this.props.updateCompoundInterest({
      principal: this.props.compoundInterest.principal,
      rate: event.target.value,
      time: this.props.compoundInterest.time,
      compound: this.props.compoundInterest.compound,
      error: false,
      interest: this.props.compoundInterest.interest
    });
  }

  updateTime = (event) => {
    this.props.updateCompoundInterest({
      principal: this.props.compoundInterest.principal,
      rate: this.props.compoundInterest.rate,
      time: event.target.value,
      compound: this.props.compoundInterest.compound,
      error: false,
      interest: this.props.compoundInterest.interest
    });
  }

  updateCompound = (event) => {
    this.props.updateCompoundInterest({
      principal: this.props.compoundInterest.principal,
      rate: this.props.compoundInterest.rate,
      time: this.props.compoundInterest.time,
      compound: event.target.value,
      error: false,
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
        error: 'Invalid Rate',
        compound: this.props.compoundInterest.compound,
        interest: this.props.compoundInterest.interest
      });
      return false;
    }

    // now check the principal
    if (this.props.compoundInterest.principal < 0) {
      this.props.updateCompoundInterest({
        principal: this.props.compoundInterest.principal,
        rate: this.props.compoundInterest.rate,
        time: this.props.compoundInterest.time,
        error: 'Invalid Principal',
        compound: this.props.compoundInterest.compound,
        interest: this.props.compoundInterest.interest
      });
      return false;
    }

    // now check the time
    if (this.props.compoundInterest.time < 0) {
      this.props.updateCompoundInterest({
        principal: this.props.compoundInterest.principal,
        rate: this.props.compoundInterest.rate,
        time: this.props.compoundInterest.time,
        error: 'Invalid Time',
        compound: this.props.compoundInterest.compound,
        interest: this.props.compoundInterest.interest
      });
      return false;
    }

    // calculate
    let interestChart = [];
    let previousAmount = this.props.compoundInterest.principal;
    for (let i = 0; i < this.props.compoundInterest.time; i++)
    {
      let rate = this.props.compoundInterest.rate / 100;
      let interest = this.props.compoundInterest.principal * Math.pow(1 + (rate / this.props.compoundInterest.compound), ((i + 1) * this.props.compoundInterest.compound));
      interestChart.push({
        year: i + 1,
        interest: interest - previousAmount,
        total: interest
      });
      previousAmount = interest;
    }

    // set the values
    this.props.updateCompoundInterest({
      principal: this.props.compoundInterest.principal,
      rate: this.props.compoundInterest.rate,
      time: this.props.compoundInterest.time,
      error: false,
      compound: this.props.compoundInterest.compound,
      interest: interestChart
    });

    return false;
  }

  renderChart = () => {
    if (this.props.compoundInterest.interest.length) {
      return this.props.compoundInterest.interest.map((item) => {
        return (
          <tr key={item.year}>
            <td>{item.year}</td>
            <td>$ {item.interest.toFixed(2)}</td>
            <td className="align-right">$ {item.total.toFixed(2)}</td>
          </tr>
        )
      });
    }
  }

  renderError = () => {
    if (this.props.compoundInterest.error) {
      return (
        <div className="alert alert-danger" role="alert">
          {this.props.compoundInterest.error}
        </div>
      )
    }
  }

  renderTable = () => {
    if (this.props.compoundInterest.interest.length) {
      return (
        <table width="100%" className="table table-striped">
          <thead>
            <tr>
              <th>Year</th>
              <th>Interest</th>
              <th className="align-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {this.renderChart()}
          </tbody>
        </table>
      );
    }
  }

  render() {
    return (
      <div className="compound-interest">
        <h2>Compound Interest</h2>
        {this.renderError()}
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
            <span className="small-text">Annually (1/Yr)</span>
            <label htmlFor="compound">Compound (n):</label>
            <select id="compound" className="form-control" value={this.props.compoundInterest.compound}
              onChange={this.updateCompound}>
                <option value="365">Daily (365/Yr)</option>
                <option value="360">Daily (360/Yr)</option>
                <option value="52">Weekly (52/Yr)</option>
                <option value="26">Bi-Weekly (26/Yr)</option>
                <option value="24">Semi-Monthly (24/Yr)</option>
                <option value="12">Monthly (12/Yr)</option>
                <option value="6">Bi-Monthly (6/Yr)</option>
                <option value="4">Quarterly (4/Yr)</option>
                <option value="2">Semi-Annually (2/Yr)</option>
                <option value="1">Annually (1/Yr)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time (t) (in year):</label>
            <input type="number" min="0" required className="form-control"
              id="time" onChange={this.updateTime} value={this.props.compoundInterest.time}/>
          </div>
          <button type="submit" className="btn btn-primary form-control m-t">Calculate</button>
        </form>
        <div className="m-t-lg result-chart table-responsive">
          {this.renderTable()}
        </div>
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
