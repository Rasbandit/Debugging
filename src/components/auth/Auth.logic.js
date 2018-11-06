import axios from 'axios';

export default {
  login(login) {
    if ((loginInfo.username && loginInfo.password) || process.env.NODE_ENV === 'development') {
      axios.post('/api/auth/login', loginInfo)
        .then((response) => {
          this.props.getUser(response.data);
          this.props.history.push('/dashboard');
        })
        .catch((err) => {
          return { wrongLogin: true };
        });
    } else {
      return { emptyFields: true };
    }
  },

  register(info) {
    if (registerInfo.username && registerInfo.password) {
      axios.post('/api/auth/register', registerInfo)
        .then((response) => {
          this.props.getUser(response.data);
          this.props.history.push('/dashboard');
        })
        .catch((err) => {
          this.setState({ usernameExists: true });
        });
    } else {
      this.setState({ emptyFields: true });
    }
  }

}