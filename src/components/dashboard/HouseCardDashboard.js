import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { favoriteHouse, unfavoriteHouse } from './../../ducks/reducer';


class HouseCardDashboard extends Component {
  constructor(props) {
    super(props);

    let flag = false;
    this.props.favoriteHouses.forEach((item) => {
      if (item.house_id === props.house.id) {
        flag = true;
      }
    });

    this.state = {
      house: props.house,
      favoriteHouses: props.favoriteHouses,
      favorited: flag
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.favoriteHouses.forEach((item) => {
      if (item.house_id === this.state.house.id) {
        this.setState({ favorited: true });
      }
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
    const { house } = this.state;

    return (
      <div className="house-card-dashboard">
        {
          this.state.favorited ?
            (<div
              className="star"
              onClick={() => { this.unfavoriteHouse(house.id); }}
            >
              <FontAwesome
                name="star"
                size="lg"
                style={{ color: 'gold' }}
              /></div>) :
            (<div
              className="star"
              onClick={() => { this.favoriteHouse(house.id); }}
            >
              <FontAwesome
                name="star-o"
                size="lg"
                style={{ color: 'gold' }}
              />
            </div>)
        }
        <Link to={`/details/${house.id}`} className="img-container">
          <img src={house.img} alt={house.description} />
        </Link>
        <Link to={`/details/${house.id}`} className="test">
          <h1>{house.title}</h1>
          <h4>
            <span>Desired Rent:</span> ${house.desired_rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favoriteHouses: state.favoriteHouses
  };
}

export default connect(mapStateToProps, { favoriteHouse, unfavoriteHouse })(HouseCardDashboard);
