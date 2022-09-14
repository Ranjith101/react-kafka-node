const {createPool} = require('mysql');

const pool = createPool({    
    port:'',
    host:'localhost',
    user:'root',
    password:'',
    database:'kafka_db',
    connectionLimit:10
});

module.exports = pool;

