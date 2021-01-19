import React, { useState } from 'react';
import SelectMode from '../Containers/SelectMode';
import Game from '../Containers/Game';

function Play() {
  const [lobbyID, setLobbyID] = useState(false);

  // if user selected lobby, then show game in lobby
  if (lobbyID) {
    return <Game lobbyID={lobbyID} resetLobbyID={() => setLobbyID(false)} />;
  }

  return <SelectMode lobbyID={lobbyID} setLobbyID={(id) => setLobbyID(id)} />;
}

export default Play;
