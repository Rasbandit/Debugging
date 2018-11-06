import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import inactive from './../../images/step_inactive.png';
import active from './../../images/step_active.png';
import complete from './../../images/step_completed.png';
import SweetAlert from 'sweetalert2-react';

class Two extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: props.address,
      city: props.city,
      state: props.state,
      zip: props.zip,
      show: false
    };
  }

  handleAddress(address) {
    this.setState({ address });
  }

  handleCity(city) {
    this.setState({ city });
  }

  handleState(state) {
    this.setState({ state });
  }

  handleZip(zip) {
    if(zip.length > 5) {
      zip = [...zip].splice(0, 5).join('');
    }
    if (zip && parseInt(zip, 10) && zip[zip.length - 1] !== /d/ && zip.length < 6) {
      this.setState({
        zip: parseInt(zip, 10)
      });
    } else if(zip === '' || zip === 0) {
      this.setState({
        zip: ''
      });
    }
  }

  nextStep(info) {
    const { address, city, state, zip } = info;
    if (address && city && state && zip) {
      this.props.handleChange(info);
    } else {
      this.setState({ show: true });
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
          Step Two
        </h1>
        <div className="step-gauge">
          <img src={complete} alt="circle" />
          <img src={active} alt="circle" />
          <img src={inactive} alt="circle" />
          <img src={inactive} alt="circle" />
          <img src={inactive} alt="circle" />
        </div>
        <div className="inputs">
          <section>
            <label>Address</label>
            <input name="address" type="text" value={this.state.address} onChange={(e) => { this.handleAddress(e.target.value); }} />
          </section>
          <div className="middle">
            <section>
              <label>City</label>
              <input name="city" type="text" value={this.state.city} onChange={(e) => { this.handleCity(e.target.value); }} />
            </section>
            <section>
              <label>State</label>
              <input name="state" type="text" value={this.state.state} onChange={(e) => { this.handleState(e.target.value); }} />
            </section>
            <section>
              <label>Zip</label>
              <input name="zip" type="text" value={this.state.zip} onChange={(e) => { this.handleZip(e.target.value); }} />
            </section>
          </div>
          <div className="buttons">
            <Link to="/wizzard/1" className="next-button">
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

export default Two;
