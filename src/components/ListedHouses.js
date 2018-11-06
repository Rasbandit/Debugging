import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListedHouseCard from './HouseCardListed';

class Favorites extends Component {
  render() {
    const houses = this.props.listedHouses.map(house => (
      <ListedHouseCard
        house={house}
        favoriteHouses={this.props.favoriteHouses}
        key={house.id}
        favorite={this.favorite}
        unfavorite={this.unfavorite}
      />
    ));
    return (
      <div className="favorites">
        <h1>Your Listings</h1>
        {houses}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    listedHouses: state.listedHouses,
  };
}

export default connect(mapStateToProps)(Favorites);
