import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHouses, getFavorites, getListed } from '../../ducks/reducer';

import HouseCardDashboard from './HouseCardDashboard';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      houses: [],
      favoriteHouses: [],
      listed: [],
      desiredRent: Infinity,
    };

    this.favorite = this.favorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
  }

  componentDidMount() {
    if (!this.props.user.id && process.env.NODE_ENV !== 'development') {
      this.props.history.push('/');
    }
    this.props.getHouses();
    this.props.getFavorites();
    this.props.getListed();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      favoriteHouses: nextProps.favoriteHouses,
      houses: nextProps.houses,
    });
  }

  favorite(houseId) {
    axios.post(`/api/favorites/${houseId}`).then(favHouses => {
      this.setState({
        favoriteHouses: favHouses.data,
      });
    });
  }

  unfavorite(houseId) {
    axios.delete(`/api/favorites/${houseId}`).then(favHouses => {
      this.setState({
        favoriteHouses: favHouses.data,
      });
    });
  }

  handleType(desiredRent) {
    desiredRent = desiredRent.replace(/,/g, '');
    if (desiredRent && parseInt(desiredRent, 10) && desiredRent[desiredRent.length - 1] !== /d/) {
      this.setState({
        desiredRent: desiredRent.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      });
    } else {
      this.setState({
        desiredRent: Infinity,
      });
    }
  }

  clearInput() {
    this.setState({
      desiredRent: Infinity,
    });
  }

  render() {
    let desiredRent = this.state.desiredRent;
    if (desiredRent !== Infinity) {
      desiredRent = parseInt(this.state.desiredRent.toString().replace(/,/g, ''), 10);
    }
    const houses = this.state.houses
      .filter(house => house.desired_rent <= desiredRent)
      .map(house => (
        <HouseCardDashboard
          house={house}
          favoriteHouses={this.state.favoriteHouses}
          key={house.id}
          favorite={this.favorite}
          unfavorite={this.unfavorite}
        />
      ));
    return (
      <div className="dashboard">
        <div className="top">
          <Link to="/wizzard/1" className="button">
            Add new property
          </Link>
          <div className="filter">
            List properties with desired rent less than $<input
              type="text"
              value={this.state.desiredRent === Infinity ? '' : this.state.desiredRent}
              onChange={e => {
                this.handleType(e.target.value);
              }}
            />
            <div
              className="reset-btn"
              onClick={() => {
                this.clearInput();
              }}
            >
              Reset
            </div>
          </div>
        </div>
        <div className="houses">{houses}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    houses: state.houses,
    favoriteHouses: state.favoriteHouses,
    user: state.user,
  };
}

export default connect(mapStateToProps, { getHouses, getFavorites, getListed })(Dashboard);
