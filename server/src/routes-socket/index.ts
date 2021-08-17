import { RequestHandler } from 'express';
import { Server, Socket } from 'socket.io';
import play from 'routes-socket/game/play';
import spectate from 'routes-socket/game/spectate';

function events(io: Server, sessionMiddleware: RequestHandler) {
  // weird wrapper, there might exist a better solution
  // https://socket.io/docs/v4/middlewares/#Compatibility-with-Express-middleware
  const wrap = (middleware: any) => (socket: Socket, next: any) =>
    middleware(socket.request, {}, next);
  io.use(wrap(sessionMiddleware));

  io.on('connect', (socket: Socket) => {
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

export default events;
