import React, { Component } from 'react';
import SweetAlert from 'sweetalert2-react';
import inactive from './../../images/step_inactive.png';
import active from './../../images/step_active.png';

class One extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      desc: props.desc,
      show: false
    };
  }

  nextStep(info) {
    const { title, desc } = info;
    if (title && desc) {
      this.props.handleChange(info);
    } else {
      this.setState({ show: true });
    }
  }

  handleTitle(title) {
    this.setState({ title });
  }

  handleDesc(desc) {
    this.setState({ desc });
  }

  render() {
    return (
      <div className="step">
        <SweetAlert
          show={this.state.show}
          type="info"
          title="Empty Fields"
          text="Please make sure all fields are filled."
          showLoading
          onConfirm={() => this.setState({ show: false })}
          onOutsideClick={() => this.setState({ show: false })}
        />
        <h1>
          Step One
        </h1>
        <div className="step-gauge">
          <img src={active} alt="circle" />
          <img src={inactive} alt="circle" />
          <img src={inactive} alt="circle" />
          <img src={inactive} alt="circle" />
          <img src={inactive} alt="circle" />
        </div>
        <div className="inputs">
          <section>
            <label>Property Name</label>
            <input
              value={this.state.title}
              onChange={(e) => { this.handleTitle(e.target.value); }}
              type="text"
            />
          </section>
          <section>
            <label>Property Descriptions</label>
            <textarea
              value={this.state.desc}
              onChange={(e) => { this.handleDesc(e.target.value); }}
            ></textarea>
          </section>
          <div className="buttons">
            <div
              to="/wizzard/2"
              onClick={() => { this.nextStep(this.state); }}
              className="next-button"
            >
            Next Step
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default One;
