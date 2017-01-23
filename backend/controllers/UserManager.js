var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;

var url = 'mongodb://localhost:27017/cwiczenie1db';


function addUser(res, query) {
    console.log(query);
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            res.end();
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('users');
            var newUser = {
                name: query.name,
                age: query.age,
                phoneNumber: query.phoneNumber,
                roles: ['user']
            };

            collection.insert(newUser, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                db.close();
                    res.writeHead(200, {
			"Access-Control-Allow-Origin": "http://www.cwiczenia1.com"
                    });
                res.end('User added');
            });
        }
    });
}

function removeUser(res, query) {
    console.log(query);
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            res.end();
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('users');

            var newUser = {
                name: query.name,
                age: query.age,
                phoneNumber: query.phoneNumber,
                roles: ['user']
            };

            collection.deleteOne(newUser, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Removed!');
                }
                db.close();
            });
                    res.writeHead(200, {
			"Access-Control-Allow-Origin": "http://www.cwiczenia1.com"
                    });
            res.end('user removed');
        }
    });
}

function getUsers(res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            res.end();
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('users');
						var buf = [];
            data = collection.find().each(function(err, doc) {
                if (doc != null) {
										buf.push(doc);
                } else {
                    res.writeHead(200, {
                        "Content-Type": "application-json",
			"Access-Control-Allow-Origin": "http://www.cwiczenia1.com"
                    });
										res.end(JSON.stringify(buf));
                }
            });
        }
    });
}

var UserManager = {
    go: function(res, action, query) {
        switch (action) {
//		http://127.0.0.1:8081/UserManager/addUser?name=Filemon&age=99&phoneNumber=890890890
            case 'addUser':
                addUser(res, query);
                console.log('USER ADD');
                break;
            case 'removeUser':
                removeUser(res, query);
                console.log('USER REM');
                break;
            case 'getUsers':
                getUsers(res);
                console.log('USER GET');
                break;
        }
    }
}
module.exports = UserManager;
