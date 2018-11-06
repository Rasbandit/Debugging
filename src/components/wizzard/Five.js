import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import active from './../../images/step_active.png';
import complete from './../../images/step_completed.png';

class Five extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recomendedRent: props.recomendedRent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      desiredRent: props.desiredRent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    };
  }

  handleRent(desiredRent) {
    desiredRent = desiredRent.replace(/,/g, '').split('').filter(item => item !== '$').join('');
    if (desiredRent && parseInt(desiredRent, 10) && desiredRent[desiredRent.length - 1] !== /d/) {
      this.setState({
        desiredRent: desiredRent.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      });
    }
    if (desiredRent === '' || desiredRent === 0) {
      this.setState({
        desiredRent: ''
      });
    }
  }

  complete(info) {
    let { desiredRent } = info;
    desiredRent = parseInt(desiredRent.replace(/,/g, '').split('').filter(item => item !== '$').join(''), 10);
    this.props.handleChange({ desiredRent });
  }

  render() {
    return (
      <div className="step">
        <h1>
          Step Five
        </h1>
        <div className="step-gauge">
          <img src={complete} alt="circle" />
          <img src={complete} alt="circle" />
          <img src={complete} alt="circle" />
          <img src={complete} alt="circle" />
          <img src={active} alt="circle" />
        </div>
        <div className="inputs">
          <h1>Recommended Rent: ${this.state.recomendedRent}</h1>
          <section>
            <label>Desired Rent</label>
            <input value={`$${this.state.desiredRent}`} onChange={(e) => { this.handleRent(e.target.value); }} />
          </section>
          <div className="buttons">
            <Link to="/wizzard/4" className="next-button">
              Previous Step
            </Link>
            <div onClick={() => { this.complete(this.state); }} className="next-button complete">
              Complete
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Five;
