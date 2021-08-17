import { Request, Response } from 'express';

function home(req: Request, res: Response) {
  const API_ROUTE = process.env.API_ROUTE;

  let home = `
    <div>
      <h1>home</h1>
      <p>user: ${req.user}</p>
    </div>
  `;

  let register = `
    <div>
      <h1>register</h1>
      <form action='${API_ROUTE}/register' method='POST'>
        <div>
          <label for='username'>name</label>
          <input type='text' id='username' name='username' required>
        </div>
        <div>
          <label for='password'>password</label>
          <input type='password' id='password' name='password' required>
        </div>
        <button type='submit'>register</button>
      </form>
    </div>
  `;

  let login = `
    <div>
      <h1>login</h1>
      <form action='${API_ROUTE}/login' method='POST'>
        <div>
          <label for='username'>name</label>
          <input type='text' id='username' name='username' required>
        </div>
        <div>
          <label for='password'>password</label>
          <input type='password' id='password' name='password' required>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  `;

  let logout = `
    <div>
      <h1>logout</h1>
      <form action='${API_ROUTE}/logout' method='POST'>
        <button type='submit'>logout</button>
      </form>
    </div>
  `;

  let playSolo = `
    <div>
      <h1>play solo</h1>
      <form action='${API_ROUTE}/play/solo' method='POST'>
        <div>
          <label for='shape'>shape</label>
          <input type='text' id='shape' name='shape' value='square' required>
        </div>
        <div>
          <label for='difficulty'>difficulty</label>
          <input type='text' id='difficulty' name='difficulty' value='easy'>
        </div>
        <div>
          <label for='height'>height</label>
          <input type='text' id='height' name='height'>
        </div>
        <div>
          <label for='width'>width</label>
          <input type='text' id='width' name='width'>
        </div>
        <div>
          <label for='bombCount'>bombCount</label>
          <input type='text' id='bombCount' name='bombCount'>
        </div>
        <button type='submit'>gen</button>
      </form>
    </div>
  `;

  let socketTest = `
    <div>
      <h1>start</h1>
      <form id="startform">
        <button>Send</button>
      </form>
    </div>
    <div>
      <h1>move</h1>
      <form id="moveform">
        <input id="act" />
        <input id="movex" />
        <input id="movey" />
        <button>Send</button>
      </form>
    </div>
    <div>
      <input id="status" />
    </div>

    <script src="https://cdn.socket.io/socket.io-3.0.1.min.js"></script>

    <script>
      let socket = io('http://localhost:${process.env.PORT}', {
        path: '${process.env.API_ROUTE}/socket',
        query: {'lobbyID': '${process.env.DEV}', 'action': 'play'}
      });

      let status = document.getElementById('status');
      let startform = document.getElementById('startform');
      startform.addEventListener('submit', function(e) {
        e.preventDefault();
        socket.emit('start');
      });
      
      let movex = document.getElementById('movex');
      let movey = document.getElementById('movey');
      let act = document.getElementById('act');
      let moveform = document.getElementById('moveform');
      moveform.addEventListener('submit', function(e) {
        e.preventDefault();
        socket.emit('move', {'action': act.value, 'row': movex.value, 'col': movey.value});
      });

      function showBoard(array) {
        for (let r = 0; r < array.length; r++) {
          console.log(array[r].join());
        }
      }

      socket.on('status', (s) => {status.value = s});
      socket.on('update', (d) => {console.log('update'); console.log(d); showBoard(d.board)});
      socket.on('results', (r) => {console.log('results'); console.log(r)});
    </script>
  `;
  return res.status(200).send(`
    ${socketTest}
    ${playSolo}
    ${home}
    ${register}
    ${login}
    ${logout}
  `);
}

export default home;
