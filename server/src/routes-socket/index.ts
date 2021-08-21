import { IncomingMessage } from 'http';
import { SessionData } from 'express-session';
import { Server, Socket } from 'socket.io';
import play from 'routes-socket/game/play';
import spectate from 'routes-socket/game/spectate';

declare module 'express-session' {
  interface SessionData {
    passport: { user: string };
  }
}
interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
}
interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}

// weird wrapper, there might exist a better solution
// https://socket.io/docs/v4/middlewares/#Compatibility-with-Express-middleware
function socketWrapper(middleware: any) {
  return (socket: Socket, next: any) => middleware(socket.request, {}, next);
}

function socketEvents(io: Server) {
  io.on('connect', (defaultSocket: Socket) => {
    const socket = <SessionSocket>defaultSocket;
    socket.request.session.passport;
    // socket.request.session;
    if (socket.handshake.query.action === 'play') {
      play(socket);
    } else if (socket.handshake.query.action === 'spectate') {
      spectate(socket);
    } else {
      socket.emit('status', 'Coming soon!');
      socket.disconnect(true);
    }
  });
}

export { SessionSocket, socketEvents, socketWrapper };
