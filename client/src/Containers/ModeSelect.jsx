import React, { Component } from 'react';
import SelectSolo from '../Components/SelectSolo';
import SelectMulti from '../Components/SelectMulti';

class ModeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solo: false,
      multi: false,
      lobbys: []
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
              lobbys: this.state.lobbys
            });
          }}
        />
        <SelectMulti
          solo={this.state.solo}
          multi={this.state.multi}
          playMulti={() => {
            this.setState({
              solo: false,
              multi: true,
              lobbys: this.state.lobbys
            });
          }}
        />
      </div>
    );
  }
}

export default ModeSelect;
