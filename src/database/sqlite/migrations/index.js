const sqlConnection = require('../../sqlite');

const createUsers = require('./createUsers');

async function migrationsRun(){
    schemas = [
        createUsers
    ].join('')

    sqlConnection()
        .then(db => db.exec(schemas))
        .catch(err => console.log(err))
};

module.exports = migrationsRun