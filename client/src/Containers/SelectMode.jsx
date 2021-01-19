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
      lobbies: [],
      pastLobbies: []
    };
  }

  setLobbies(lobbies) {
    this.setState({
      solo: this.state.solo,
      multi: this.state.multi,
      lobbies: lobbies,
      pastLobbies: this.state.pastLobbies
    });
  }
  setPastLobbies(lobbies) {
    this.setState({
      solo: this.state.solo,
      multi: this.state.multi,
      lobbies: this.state.lobbies,
      pastLobbies: lobbies
    });
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
                lobbies: this.state.lobbies,
                pastLobbies: this.state.pastLobbies
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
                lobbies: this.state.lobbies,
                pastLobbies: this.state.pastLobbies
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
