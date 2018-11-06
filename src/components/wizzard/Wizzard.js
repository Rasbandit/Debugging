import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert2';
import axios from 'axios';
import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';
import Five from './Five';

class Wizzard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      desc: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      images: [],
      loanAmount: '',
      monthlyMortgage: '',
      recomendedRent: '',
      desiredRent: '',
      uploadPass: false,
      uploadFail: false,
    };

    this.handleStepOne = this.handleStepOne.bind(this);
    this.handleStepTwo = this.handleStepTwo.bind(this);
    this.handleStepThree = this.handleStepThree.bind(this);
    this.handleStepFour = this.handleStepFour.bind(this);
    this.handleStepFive = this.handleStepFive.bind(this);
  }

  handleStepOne(info) {
    const { title, desc } = info;
    this.setState({ title, desc });
    this.props.history.push('/wizzard/2');
  }

  handleStepTwo(info) {
    const { address, city, state, zip } = info;
    if (address && city && state && zip) {
      this.setState({ address, city, state, zip });
      this.props.history.push('/wizzard/3');
    }
  }

  handleStepThree(info) {
    const { images } = info;
    if (images.length) {
      this.setState({ images });
      this.props.history.push('/wizzard/4');
    }
  }

  handleStepFour(info) {
    const { loanAmount, monthlyMortgage } = info;
    if (loanAmount && monthlyMortgage) {
      const recomendedRent = monthlyMortgage + monthlyMortgage * 0.25;
      this.setState({ loanAmount, monthlyMortgage, recomendedRent });
      this.props.history.push('/wizzard/5');
    }
  }

  handleStepFive(info) {
    const { desiredRent } = info;
    if (desiredRent) {
      swal({
        title: 'Uploading House Info',
        text: 'Please wait.',
        allowOutsideClick: false,
        onOpen: () => {
          swal.showLoading();
          return new Promise((resolve, reject) => {
            this.setState({ desiredRent }, async () => {
              const data = await axios.post('/api/create', this.state);
              swal.close();
              if (data.status === 200) {
                this.setState({ uploadPass: true });
              } else {
                this.setState({ uploadFail: true });
              }
            });
          });
        },
      });
    }
  }

  render() {
    return (
      <div className="wizzard">
        <SweetAlert
          show={this.state.uploadPass}
          type="success"
          title="Success"
          text="Your listing was uploaded!"
          onConfirm={() =>
            this.setState({ uploadPass: false }, () => {
              this.props.history.push('/dashboard');
            })
          }
        />
        <SweetAlert
          show={this.state.uploadFail}
          type="error"
          title="Upload Failed"
          text="Please try again later."
          onConfirm={() => this.setState({ uploadFail: false })}
        />
        <div className="top">
          <h2>Add new listing</h2>
          <Link to="/dashboard" className="button">
            Cancel
          </Link>
        </div>
        <Switch>
          <Route
            path="/wizzard/1"
            render={() => <One handleChange={this.handleStepOne} title={this.state.title} desc={this.state.desc} />}
          />
          <Route
            path="/wizzard/2"
            render={() => (
              <Two
                handleChange={this.handleStepTwo}
                address={this.state.address}
                city={this.state.city}
                state={this.state.state}
                zip={this.state.zip}
              />
            )}
          />
          <Route
            path="/wizzard/3"
            render={() => <Three handleChange={this.handleStepThree} images={this.state.images} />}
          />
          <Route
            path="/wizzard/4"
            render={() => (
              <Four
                handleChange={this.handleStepFour}
                monthlyMortgage={this.state.monthlyMortgage}
                loanAmount={this.state.loanAmount}
              />
            )}
          />
          <Route
            path="/wizzard/5"
            render={() => (
              <Five
                handleChange={this.handleStepFive}
                recomendedRent={this.state.recomendedRent}
                desiredRent={this.state.desiredRent}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Wizzard;
