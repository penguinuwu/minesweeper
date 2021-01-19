import React, { Component } from 'react';
import io from 'socket.io-client';
import GameBoard from './GameBoard';
import GameStats from './GameStats';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      time: null,
      data: {
        start: null,
        end: null,
        bombs: 0,
        lives: 0,
        myTurn: false,
        board: []
      }
    };

    // autoconnect socket
    this.socket = io(`${process.env.REACT_APP_API_DOMAIN}`, {
      path: `${process.env.REACT_APP_API_PATH}/socket`,
      query: { lobbyID: props.lobbyID, action: 'play' },
      withCredentials: true,
      autoConnect: true
    });

    // socket emitters
    this.startGame = this.startGame.bind(this);
    this.makeMove = this.makeMove.bind(this);

    // state setters
    this.setStatus = this.setStatus.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setData = this.setData.bind(this);

    // timer
    this.intervalID = setInterval(() => {
      // do not update if game has not started or has ended
      if (!this.state.data.start || this.state.data.end) return;
      this.setTime(Date.now() - new Date(this.state.data.start));
    }, 1000);
  }

  // state setters
  setStatus(s) {
    this.setState({
      status: s,
      time: this.state.time,
      data: this.state.data
    });
  }
  setTime(t) {
    let str = null;

    let days = Math.floor(t / 86400000);
    let hours = Math.floor((t / 3600000) % 24);
    let minutes = Math.floor((t / 60000) % 60);
    let seconds = Math.floor((t / 1000) % 60);

    if (days > 0) {
      str = `${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      str = `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      str = `${minutes}m ${seconds}s`;
    } else {
      str = `${seconds}s`;
    }

    this.setState({
      status: this.state.status,
      time: str,
      data: this.state.data
    });
  }
  setData(d) {
    this.setState({
      status: this.state.status,
      time: this.state.time,
      data: {
        start: d.start,
        end: d.end,
        bombs: d.bombs,
        lives: d.lives,
        myTurn: d.myTurn,
        board: d.board
      }
    });
  }

  componentDidMount() {
    // listeners
    this.socket.on('status', this.setStatus);
    this.socket.on('update', this.setData);
    this.socket.on('results', (d) => {
      // stop timer when game end
      clearInterval(this.intervalID);
      this.setTime(new Date(d.end) - new Date(d.start));
      this.setData(d);
    });

    // todo: handle errors ..?
    // this.socket.on('error', (e) => console.log(`error ${e}`));
    // this.socket.on('reconnect', (e) => console.log(`reconnect ${e}`));
    // this.socket.on('reconnect_attempt', (e) => console.log(`reconnect_attempt ${e}`));
    // this.socket.on('reconnect_error', (e) => console.log(`reconnect_error ${e}`));
    // this.socket.on('reconnect_failed', (e) => console.log(`reconnect_failed ${e}`));
    // this.socket.on('ping', (e) => console.log(`ping ${e}`));
  }

  startGame() {
    this.socket.emit('start');
  }
  makeMove(action, row, col) {
    this.socket.emit('move', { action: action, row: row, col: col });
  }

  // close socket
  componentWillUnmount() {
    this.socket.off('status');
    this.socket.off('update');
    this.socket.off('results');
    this.socket.close();
  }

  render() {
    return (
      <div className='row'>
        <div className='col-12 col-xl-8 pb-2 pb-xl-0 pe-xl-2'>
          <GameBoard
            data={this.state.data}
            startGame={this.startGame}
            makeMove={this.makeMove}
          />
        </div>
        <div className='col-12 col-xl-4 pt-2 pt-xl-0 ps-xl-2'>
          <GameStats
            time={this.state.time}
            data={this.state.data}
            startGame={this.startGame}
          />
        </div>
      </div>
    );
  }
}

export default Game;
