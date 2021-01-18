import React, { useState } from 'react';
import ModeSelect from '../Containers/ModeSelect';
import Lobby from '../Containers/LobbySelect';
import Game from '../Containers/Game';

function Play() {
  const [status, setStatus] = useState(false);
  const [lobbyID, setLobbyID] = useState(false);

  // if user selected lobby, then show game in lobby
  if (lobbyID) {
    return (
      <Game
        status={status}
        resetStatus={() => setStatus(false)}
        lobbyID={lobbyID}
        resetLobbyID={() => setLobbyID(false)}
      />
    );
  }

  // show user multi lobbies
  if (status) {
    return (
      <Lobby
        resetStatus={() => setStatus(false)}
        lobbyID={lobbyID}
        setLobbyID={(id) => setLobbyID(id)}
      />
    );
  }

  return (
    <ModeSelect
      setStatus={(s) => setStatus(s)}
      setLobbyID={(id) => setLobbyID(id)}
    />
  );
}

export default Play;
