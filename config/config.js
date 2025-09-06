require('dotenv').config(); // Load .env
const appEnv = process.env;

module.exports  = {
  "development": {
    "username": appEnv.DB_USER,
    "password": appEnv.DB_PASSWORD,
    "database": appEnv.DB_NAME,
    "host": appEnv.DB_HOST,
    "dialect": appEnv.DB_TYPE
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
