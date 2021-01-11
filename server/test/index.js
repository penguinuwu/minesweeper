const test = (req, res, next) => {
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

  return res.status(200).send(`
    ${home}
    ${register}
    ${login}
    ${logout}
  `);
};

module.exports = test;
