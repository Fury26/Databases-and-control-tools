// const Pool = require('pg').Pool
//
// //connecting to the local database
// const pool = new Pool({
//     user: "postgres",
//     password: "1928sfsf",
//     host: "localhost",
//     port: 5432,
//     database: "footballtournaments",
// });
//
//
// module.exports = pool;


const Sequelize = require('sequelize');

const db = new Sequelize('footballtournaments', 'postgres', '1928sfsf', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});

module.exports = db;
