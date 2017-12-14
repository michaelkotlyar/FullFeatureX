var db = require('/database');

var allUsers = function() {
  let sco;

  db.connect()
    .then(obj => {
        // obj.client = new connected Client object;

        sco = obj; // save the connection object;

        // execute all the queries you need:
        return sco.any('SELECT * FROM Users');
    })
    .then(data => {
        // success
        return data;
    })
    .catch(error => {
        // error
    })
    .finally(() => {
        // release the connection, if it was successful:
        if (sco) {
            sco.done();
        }
    });
}

module.exports = allUsers;
