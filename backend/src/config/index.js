const dotenv = require('dotenv');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../..');

dotenv.config({ path: path.join(ROOT_DIR, '.env') });

const config = {
  port: parseInt(process.env.PORT, 10) || 3001,
  dbPath: path.resolve(ROOT_DIR, process.env.DB_PATH || './data/birdseye.db'),
};

module.exports = config;
