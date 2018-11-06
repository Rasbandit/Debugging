import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { favoriteHouse, unfavoriteHouse } from './../ducks/reducer';
import axios from 'axios';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      house: {},
      images: [],
      main: 0,
      favorited: false
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


  render() {
    const { house, images, main } = this.state;

    const thumbnails = this.state.images.map((image, index) => (
      <div onClick={() => { this.updateMain(index); }} key={image.id} className="thumbnail">
        <img src={image.url} alt="" />
      </div>
    ));
    return (
      <div className="details">
        {this.state.favorited ? (
          <div className="title">
            <FontAwesome
              name="star"
              size="lg"
              style={{ color: 'gold' }}
            />
            <h1>{house.title}</h1>
            <FontAwesome
              name="star"
              size="lg"
              style={{ color: 'gold' }}
            />
          </div>
        ) : (
          <div className="title">
            <h1>{house.title}</h1>
          </div>
        )}
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
          <p>
            {house.description}
          </p>
        </div>
        <div className="information">
          <div className="column">
            <h4><span>Loan:</span> ${house.loan ? house.loan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</h4>
            <h4><span>Monthly Mortgage:</span> ${house.mortgage ? house.mortgage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</h4>
            <h4><span>Recommended Rent:</span> ${house.recomended_rent ? house.recomended_rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</h4>
          </div>
          <div className="column">
            <h4><span>Desired Rent:</span> ${house.desired_rent ? house.desired_rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</h4>
            <h4><span>Address:</span> {house.address}</h4>
            <h4><span>City:</span> {house.city}</h4>
          </div>
        </div>
        {this.state.favorited ? (<div onClick={() => { this.unfavoriteHouse(house.id); }} className="unfavorite">Remove From Favorites</div>)
          : (<div onClick={() => { this.favoriteHouse(house.id); }} className="favorite">Add To Favorites</div>)
        }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favoriteHouses: state.favoriteHouses
  };
}

export default connect(mapStateToProps, { favoriteHouse, unfavoriteHouse })(Details);
