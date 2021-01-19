import React, { Component } from 'react';
import SelectSolo from '../Components/SelectSolo';
import SelectMulti from '../Components/SelectMulti';
import SelectLobby from '../Components/SelectLobby';

class SelectMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solo: false,
      multi: false
    };
    this.setSolo = this.setSolo.bind(this);
    this.setMulti = this.setMulti.bind(this);
  }

  setSolo() {
    this.setState({
      solo: true,
      multi: false
    });
  }

  setMulti() {
    this.setState({
      solo: false,
      multi: true
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className='row'>
          <SelectSolo
            solo={this.state.solo}
            multi={this.state.multi}
            playSolo={this.setSolo}
            setLobbyID={this.props.setLobbyID}
          />
          <SelectMulti
            solo={this.state.solo}
            multi={this.state.multi}
            playMulti={this.setMulti}
            setLobbyID={this.props.setLobbyID}
          />
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-6 pb-2 pb-lg-0 pe-lg-2'>
            <SelectLobby
              lobbyID={this.props.lobbyID}
              setLobbyID={this.props.setLobbyID}
              text='Ongoing games'
              textEmpty='You have no ongoing games!'
              textLogOut='Please log in to see ongoing games!'
              url={`${process.env.REACT_APP_API_URL}/lobbies`}
            />
          </div>
          <div className='col-12 col-lg-6 pt-2 pt-lg-0 ps-lg-2'>
            <SelectLobby
              lobbyID={this.props.lobbyID}
              setLobbyID={this.props.setLobbyID}
              text='Completed games'
              textEmpty='You have no completed games!'
              textLogOut='Please log in to see completed games!'
              url={`${process.env.REACT_APP_API_URL}/pastLobbies`}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SelectMode;
