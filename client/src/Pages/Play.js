import React, { useState } from 'react';
import ModeSelect from '../Containers/ModeSelect';
import Lobby from '../Containers/Lobby';

function Play() {
  const [status, setStatus] = useState(false);
  const [lobbyID, setLobbyID] = useState(false);

  if (status) {
    return (
      <Lobby
        status={status}
        setStatus={(s) => setStatus(s)}
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
