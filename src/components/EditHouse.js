import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert2';
import { getListed } from './../ducks/reducer';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      house: {
        address: '',
        city: '',
        description: '',
        desired_rent: '',
        loan: 0,
        mortgage: 0,
        recomended_rent: 0,
        state: '',
        title: ''
      },
      images: [],
      main: 0,
      uploadPass: false,
      uploadFail: false,
      deletePass: false,
      deleteFail: false,
      notLoggedIn: false
    };
  }

  componentDidMount() {
    axios.get(`/house/${this.props.match.params.id}`).then((house) => {
      let flag = false;
      this.props.favoriteHouses.forEach((item) => {
        if (item.house_id === house.data.id) {
          flag = true;
        }
      });
      this.setState({
        house: house.data,
        images: house.data.images,
        favorited: flag
      });
    });
  }

  updateMainInfoNumeral(value, attribute) {
    value = value.replace(/,/g, '');
    if (value[value.length - 1] !== /d/) {
      console.log('is a number');
      this.setState((newState) => {
        newState.house[attribute] = value;
        return newState;
      });
    }
  }

  updateMainInfoNonNumerical(value, attribute) {
    this.setState((newState) => {
      newState.house[attribute] = value;
      return newState;
    });
  }

  updateMain(id) {
    this.setState({
      main: id
    });
  }

  favoriteHouse(id) {
    this.props.favoriteHouse(id);
    this.setState({
      favorited: true
    });
  }

  unfavoriteHouse(id) {
    this.props.unfavoriteHouse(id);
    this.setState({
      favorited: false
    });
  }

  sendUpdate() {
    swal({
      title: 'Uploading House Info',
      text: 'Please wait.',
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading();
        return new Promise(async (resolve, reject) => {
          const data = await axios.put('/update', this.state.house);
          swal.close();
          if (data.status === 200) {
            this.setState({ uploadPass: true });
          } else {
            this.setState({ uploadFail: true });
          }
        });
      },
    });
  }

  deleteHouse() {
    swal({
      title: 'Uploading House Info',
      text: 'Please wait.',
      allowOutsideClick: false,
      onOpen: async () => {
        swal.showLoading();
        try {
          const data = await axios.delete(`/listing/${this.state.house.id}`);
          console.log(data);
          this.setState({ deletePass: true });
          swal.close();
        } catch(e) {
          if(e.response.status === 401) {
            this.setState({ notLoggedIn: true });
          } else {
            this.setState({ deleteFail: true });
          }
        }
      }
    });
  }


  render() {
    const { house, images, main } = this.state;
    const thumbnails = this.state.images.map((image, index) => (
      <div onClick={() => { this.updateMain(index); }} key={image.id} className="thumbnail">
        <img src={image.url} alt="" />
      </div>
    ));
    return (
      <div className="details">
        <SweetAlert
          show={this.state.uploadPass}
          type="success"
          title="Success"
          text="Your listing was updated!"
          onConfirm={() => this.setState({ uploadPass: false })}
        />
        <SweetAlert
          show={this.state.uploadFail}
          type="error"
          title="Edit Failed"
          text="Please try again later."
          onConfirm={() => this.setState({ uploadFail: false })}
        />
        <SweetAlert
          show={this.state.notLoggedIn}
          type="error"
          title="Not Authorized"
          text="Please login to the account that listed this house"
          onConfirm={() => this.setState({ notLoggedIn: false })}
        />
        <SweetAlert
          show={this.state.deletePass}
          type="success"
          title="Success"
          text="Your listing was deleted"
          onConfirm={() => this.setState({ deletePass: false }, () => { this.props.history.push('/dashboard'); })}
        />
        <SweetAlert
          show={this.state.deleteFail}
          type="error"
          title="Delete Failed"
          text="Please try again later."
          onConfirm={() => this.setState({ deleteFail: false })}
        />
        <div className="title">
          <h1>{house.title}</h1>
        </div>
        <div className="img-container">
          <img
            src={images[main] ? images[main].url : ''}
            alt=""
          />
        </div>
        <div className="thumbnails">
          {thumbnails.length <= 1 ? '' : thumbnails}
        </div>
        <div className="text">
          <textarea
            value={house.description}
            onChange={(e) => { this.updateMainInfoNonNumerical(e.target.value, 'description'); }}
          />
        </div>
        <div className="information">
          <div className="column">
            <h4>
              <span>Loan:</span>
              <input
                type="text"
                onChange={(e) => { this.updateMainInfoNumeral(e.target.value, 'loan'); }}
                value={house.loan ? house.loan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
              />
            </h4>
            <h4>
              <span>Monthly Mortgage:</span>
              <input
                type="text"
                onChange={(e) => { this.updateMainInfoNumeral(e.target.value, 'mortgage'); }}
                value={house.mortgage ? house.mortgage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
              />
            </h4>
            <h4>
              <span>Recommended Rent:</span>
              <input
                type="text"
                onChange={(e) => { this.updateMainInfoNumeral(e.target.value, 'recomended_rent'); }}
                value={house.recomended_rent ? house.recomended_rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
              />
            </h4>
          </div>
          <div className="column">
            <h4>
              <span>Desired Rent:</span>
              <input
                type="text"
                onChange={(e) => { this.updateMainInfoNumeral(e.target.value, 'desired_rent'); }}
                value={house.desired_rent ? house.desired_rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
              />
            </h4>
            <h4>
              <span>Address:</span>
              <input
                type="text"
                onChange={(e) => { this.updateMainInfoNonNumerical(e.target.value, 'address'); }}
                value={house.address}
              /></h4>
            <h4>
              <span>City:</span>
              <input
                type="text"
                onChange={(e) => { this.updateMainInfoNonNumerical(e.target.value, 'city'); }}
                value={house.city}
              /></h4>
          </div>
        </div>
        <div className="bottomBtns">
          <div onClick={() => { this.sendUpdate(); }} className="favorite">Update House</div>
          <div onClick={() => { this.deleteHouse(); }} className="unfavorite">Delete House</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favoriteHouses: state.favoriteHouses
  };
}

export default connect(mapStateToProps, { getListed })(Edit);
