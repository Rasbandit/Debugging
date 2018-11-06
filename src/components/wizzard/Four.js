import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import inactive from './../../images/step_inactive.png';
import active from './../../images/step_active.png';
import complete from './../../images/step_completed.png';

class Four extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loanAmount: props.loanAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      monthlyMortgage: props.monthlyMortgage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      show: false
    };
  }

  handleLoan(loanAmount) {
    loanAmount = loanAmount.replace(/,/g, '').split('').filter(item => item !== '$').join('');
    if (loanAmount && parseInt(loanAmount, 10) && loanAmount[loanAmount.length - 1] !== /d/) {
      this.setState({
        loanAmount: loanAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      });
    }
    if (loanAmount === '' || loanAmount === 0) {
      this.setState({
        loanAmount: ''
      });
    }
  }

  handleMortgage(monthlyMortgage) {
    monthlyMortgage = monthlyMortgage.replace(/,/g, '').split('').filter(item => item !== '$').join('');
    if (monthlyMortgage && parseInt(monthlyMortgage, 10) && monthlyMortgage[monthlyMortgage.length - 1] !== /d/) {
      this.setState({
        monthlyMortgage: monthlyMortgage.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      });
    }
    if (monthlyMortgage === '' || monthlyMortgage === 0) {
      this.setState({
        monthlyMortgage: ''
      });
    }
  }

  nextStep(info) {
    let { monthlyMortgage, loanAmount } = info;
    if (!monthlyMortgage || !loanAmount) {
      this.setState({ show: true });
    } else {
      monthlyMortgage = parseInt(monthlyMortgage.replace(/,/g, '').split('').filter(item => item !== '$').join(''), 10);
      loanAmount = parseInt(loanAmount.replace(/,/g, '').split('').filter(item => item !== '$').join(''), 10);
      this.props.handleChange({ loanAmount, monthlyMortgage });
    }
  }

  render() {
    return (
      <div className="step">
        <SweetAlert
          show={this.state.show}
          type="info"
          title="Empty Fields"
          text="Please make sure all fields are filled."
          onConfirm={() => this.setState({ show: false })}
        />
        <h1>
          Step Four
        </h1>
        <div className="step-gauge">
          <img src={complete} alt="circle" />
          <img src={complete} alt="circle" />
          <img src={complete} alt="circle" />
          <img src={active} alt="circle" />
          <img src={inactive} alt="circle" />
        </div>
        <div className="inputs">
          <section>
            <label>Loan Amount</label>
            <input type="text" value={`$${this.state.loanAmount}`} onChange={(e) => { this.handleLoan(e.target.value); }} />
          </section>
          <section>
            <label>Monthly Mortgage</label>
            <input type="text" value={`$${this.state.monthlyMortgage}`} onChange={(e) => { this.handleMortgage(e.target.value); }} />
          </section>
          <div className="buttons">
            <Link to="/wizzard/3" className="next-button">
              Previous Step
            </Link>
            <div onClick={() => { this.nextStep(this.state); }} className="next-button">
              Next Step
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Four;
