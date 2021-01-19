import React, { Component } from 'react';
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

  render() {
    return (
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
    );
  }
}

export default ModeSelect;
