import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getHouses, getFavorites, getListed, getUser } from '../../ducks/reducer';

import houseImg from './../../images/auth_logo.png';
import SweetAlert from 'sweetalert2-react';

class Auth extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      wrongLogin: false,
      emptyFields: false,
      usernameExists: false,
    };
  }

  componentDidMount() {
    this.props.getHouses();
    this.props.getFavorites();
    this.props.getListed();
  }

  login(loginInfo) {
    console.log(process.env.NODE_ENV);
    if (loginInfo.username && loginInfo.password) {
      axios
        .post('/api/auth/login', loginInfo)
        .then(response => {
          this.props.getUser(response.data);
          this.props.history.push('/dashboard');
        })
        .catch(err => {
          this.setState({ wrongLogin: true });
        });
    } else {
      this.setState({ emptyFields: true });
    }
  }

  register(registerInfo) {
    if (registerInfo.username && registerInfo.password) {
      axios
        .post('/api/auth/register', registerInfo)
        .then(response => {
          this.props.getUser(response.data);
          this.props.history.push('/dashboard');
        })
        .catch(err => {
          this.setState({ usernameExists: true });
        });
    } else {
      this.setState({ emptyFields: true });
    }
  }

  updateUsername(username) {
    this.setState({
      username,
    });
  }

  updatePassword(password) {
    this.setState({
      password,
    });
  }

  getPage() {
    const x = document.querySelector('.auth');
    console.log(x.innerHTML);
  }

  render() {
    return (
      <div
        className="auth"
        onKeyUp={e => {
          if (e.keyCode === 13) {
            this.login(this.state);
          }
        }}
      >
        <SweetAlert
          show={this.state.wrongLogin}
          type="error"
          title="Incorrect Username or Password!"
          onConfirm={() => this.setState({ wrongLogin: false })}
        />
        <SweetAlert
          show={this.state.usernameExists}
          type="info"
          title="Username already exists!"
          text="Please pick a different username."
          onConfirm={() => this.setState({ usernameExists: false })}
        />
        <SweetAlert
          show={this.state.emptyFields}
          type="info"
          title="Empty Fields"
          text="Please provide both a Username and Password."
          onConfirm={() => this.setState({ emptyFields: false })}
        />
        <img src={houseImg} alt="Its a pic of a house, I wouldn't worry about it grandma" />
        <div className="example">
          <h1>Example account</h1>
          <h1>Username: Bob Ross</h1>
          <h1>Password: HLT</h1>
        </div>
        <div className="inputs">
          <h3>Username</h3>
          <input
            type="text"
            value={this.state.username}
            onChange={e => {
              this.updateUsername(e.target.value);
            }}
          />
        </div>
        <div className="inputs">
          <h3>Password</h3>
          <input
            type="password"
            value={this.state.password}
            onChange={e => {
              this.updatePassword(e.target.value);
            }}
          />
        </div>

        <div className="buttons">
          <div
            className="button light-green"
            onClick={() => {
              this.login(this.state);
            }}
          >
            Login
          </div>
          <div
            className="button dark-green"
            onClick={() => {
              this.register(this.state);
            }}
          >
            Register
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { getHouses, getFavorites, getListed, getUser })(Auth);
