const app = require('./app');
const config = require('./config');
const { init } = require('./db/init');

// Initialize database
init();

app.listen(config.port, () => {
  console.log(`BirdsEye API running on http://localhost:${config.port}`);
});
