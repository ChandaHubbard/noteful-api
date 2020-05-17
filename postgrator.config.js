require('dotenv').config();

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 5432,
    "database": "noteful_database",
    "username": "note_master",
    "password": "",
    "ssl": !!process.env.SSL,
}
