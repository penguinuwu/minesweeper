import React, { Component } from 'react';
import axios from 'axios';
import SelectSolo from '../Components/SelectSolo';
import SelectMulti from '../Components/SelectMulti';

class ModeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solo: false,
      multi: false,
      lobbies: []
    };
  }

  setLobbies(lobbies) {
    this.setState({
      solo: this.state.solo,
      multi: this.state.multi,
      lobbies: lobbies
    });
  }

  async componentDidMount() {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/lobbies/solo`,
        withCredentials: true
      });
      // success
      this.setLobbies(res.data.lobbies);
    } catch (err) {
      this.setLobbies(false);
    }
  }

  renderLobbies() {
    let content = null;
    if (!this.state.lobbies) {
      // not logged in warning
      content = (
        <React.Fragment>
          <h2 className='card-header'>Log in to see your games!</h2>
          <div className='card-body'>
            <a className='btn btn-info btn-lg' href='/login'>
              Login <i className='fas fa-sign-in-alt fa-fw'></i>
            </a>
          </div>
        </React.Fragment>
      );
    } else if (this.state.lobbies.length === 0) {
      content = (
        <React.Fragment>
          <h2 className='card-header'>You have no past games!</h2>
        </React.Fragment>
      );
    } else {
      // unordered list of lobbies
      let lobbies = [];
      for (let i = 0; i < this.state.lobbies.length; i++) {
        lobbies.push(
          <li className='mb-1' key={i}>
            <button
              className='btn btn-info'
              onClick={() => {
                this.props.setLobbyID(this.state.lobbies[i]);
                this.props.setStatus('solo');
              }}
            >
              Play game {i+1}
            </button>
          </li>
        );
      }
      content = (
        <React.Fragment>
          <h2 className='card-header'>Past games</h2>
          <div className='card-body'>
            <ul className='list-style-none'>{lobbies}</ul>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className='row pt-3'>
        <div className='col'>
          <div className='card text-light bg-dark'>{content}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className='row'>
          <SelectSolo
            solo={this.state.solo}
            multi={this.state.multi}
            playSolo={() => {
              this.setState({
                solo: true,
                multi: false,
                lobbies: this.state.lobbies
              });
            }}
            setStatus={this.props.setStatus}
            setLobbyID={this.props.setLobbyID}
          />
          <SelectMulti
            solo={this.state.solo}
            multi={this.state.multi}
            playMulti={() => {
              this.setState({
                solo: false,
                multi: true,
                lobbies: this.state.lobbies
              });
            }}
          />
        </div>
        {this.renderLobbies()}
      </React.Fragment>
    );
  }
}

export default ModeSelect;
