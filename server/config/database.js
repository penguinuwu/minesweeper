const mongoose = require('mongoose');
mongoose.connect(process.env.DB_STRING, {
  useCreateIndex: true, // deprecation warning with Schema.index()
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));

module.exports = database;
