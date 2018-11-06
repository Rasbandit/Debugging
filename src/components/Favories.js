import React, { Component } from 'react';
import { connect } from 'react-redux';
import HouseCard from './dashboard/HouseCardFavorites';
import { getHouses, getFavorites } from './../ducks/reducer';

class Favorites extends Component {
  componentDidMount() {
    this.props.getHouses();
    this.props.getFavorites();
  }

  render() {
    const houses = this.props.houses
      .filter(house => {
        for (let i = 0; i < this.props.favoriteHouses.length; i += 1) {
          if (house.id === this.props.favoriteHouses[i].house_id) {
            return true;
          }
        }
        return false;
      })
      .map(house => (
        <HouseCard
          house={house}
          favoriteHouses={this.props.favoriteHouses}
          key={house.id}
          favorite={this.favorite}
          unfavorite={this.unfavorite}
        />
      ));
    return (
      <div className="favorites">
        <h1>Your Favorites</h1>
        {houses}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    houses: state.houses,
    favoriteHouses: state.favoriteHouses,
  };
}

export default connect(mapStateToProps, { getHouses, getFavorites })(Favorites);
