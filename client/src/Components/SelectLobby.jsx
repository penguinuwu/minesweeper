import React, { Component } from 'react';
import axios from 'axios';

class SelectLobby extends Component {
  constructor(props) {
    super(props);
    this.state = { lobbies: [] };
  }

  async componentDidMount() {
    try {
      let res = await axios({
        method: 'post',
        url: this.props.url,
        withCredentials: true
      });
      // if status exists, then this is unmounted
      if (this.props.lobbyID) return;
      // success
      this.setState({ lobbies: res.data.lobbies });
    } catch (err) {
      console.log('fuck')
      this.setState({ lobbies: false });
    }
  }

  renderLobbies() {
    if (!this.state.lobbies) {
      // not logged in warning
      return (
        <React.Fragment>
          <h3 className='card-header'>{this.props.textLogOut}</h3>
          <div className='card-body'>
            <a className='btn btn-info btn-lg' href='/login'>
              Login <i className='fas fa-sign-in-alt fa-fw'></i>
            </a>
          </div>
        </React.Fragment>
      );
    } else if (this.state.lobbies.length === 0) {
      // no past games
      return <h3 className='card-header'>{this.props.textEmpty}</h3>;
    } else {
      // unordered list of lobbies
      let lobbies = [];
      for (let i = 0; i < this.state.lobbies.length; i++) {
        lobbies.push(
          <li className='mb-1' key={i}>
            <button
              className='btn btn-info'
              onClick={() => this.props.setLobbyID(this.state.lobbies[i])}
            >
              Play game {i + 1}
            </button>
          </li>
        );
      }
      return (
        <React.Fragment>
          <h3 className='card-header'>{this.props.text}</h3>
          <div className='card-body'>
            <ul className='list-style-none'>{lobbies}</ul>
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return <div className='card text-light bg-dark'>{this.renderLobbies()}</div>;
  }
}

export default SelectLobby;
