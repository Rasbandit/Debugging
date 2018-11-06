import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { favoriteHouse, unfavoriteHouse, getHouses, getFavorites } from './../../ducks/reducer';

class HouseCardFavorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      house: props.house
    };
  }


  render() {
    const { house } = this.state;

    let flag = false;
    this.props.favoriteHouses.forEach((item) => {
      if (item.house_id === this.state.house.id) {
        flag = true;
      }
    });

    return (
      <Link to={`/details/${house.id}`} className="house-card">
        <div className="img-container">
          <img src={house.img} alt={house.description} />
        </div>
        <div className="center">
          <h3>{house.title}</h3>
          <p>{house.description}</p>
        </div>
        <div className="right">
          <div className="spread">
            <h4><span>Loan:</span> ${house.loan ? house.loan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</h4>
            {
              flag ?
                (<div onClick={() => { this.props.unfavoriteHouse(house.id); }}>
                  <FontAwesome
                    name="star"
                    size="lg"
                    style={{ color: 'gold' }}
                  /></div>) :
                (<div onClick={() => { this.props.favoriteHouse(house.id); }}>
                  <FontAwesome
                    name="star-o"
                    size="lg"
                    style={{ color: 'gold' }}
                  />
                </div>)
            }
          </div>
          <h4><span>Monthly Mortgage:</span> ${house.mortgage ? house.mortgage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</h4>
          <h4><span>Recommended Rent:</span> ${house.recomended_rent ? house.recomended_rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</h4>
          <h4><span>Desired Rent:</span> ${house.desired_rent ? house.desired_rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</h4>
          <h4><span>Address:</span> {house.address}</h4>
          <h4><span>City:</span> {house.city}</h4>
        </div>
      </Link>
    );
  }
}

function mapStateToProps(state) {
  return {
    favoriteHouses: state.favoriteHouses
  };
}

export default connect(mapStateToProps, { favoriteHouse, unfavoriteHouse, getHouses, getFavorites })(HouseCardFavorites);
