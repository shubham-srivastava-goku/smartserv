var MongoClient     = require("mongodb").MongoClient
    , config        = require("../config").config;

let mongoOptions    = config.mongoConfig;

exports.getData = (query) => {
    var url = "mongodb://" + mongoOptions.ip + ":" + mongoOptions.port;
    return new Promise((r,x) => {
        MongoClient.connect(url, (err, client) => {
            const db    = client.db(mongoOptions.database);
            const col   = db.collection(mongoOptions.collection);
    
            col.find(query).toArray((err, data) => {
                client.close();
                r(data);
            });
        }); 
    });
};

exports.insert = (query) => {
    var url = "mongodb://" + mongoOptions.ip + ":" + mongoOptions.port;
    return new Promise((r,x) => {
        MongoClient.connect(url, (err, client) => {
            const db    = client.db(mongoOptions.database);
            const col   = db.collection(mongoOptions.collection);
    
            col.find(query).toArray((err, data) => {
                client.close();
                r(data);
            });
        }); 
    });
};

exports.update = (query, updateData) => {
    var url = "mongodb://" + mongoOptions.ip + ":" + mongoOptions.port;
    return new Promise((r,x) => {
        try {
            MongoClient.connect(url, (err, client) => {
                const db    = client.db(mongoOptions.database);
                const col   = db.collection(mongoOptions.collection);
    
                col.find(query).toArray((err, data) => {
                    
                    for(let i in data[0].data) {
                        console.log(data[0].data[i]);
    
                        let chatData = data[0].data[i];
                        chatData.push(obj);
    
                        let update = {$set : { "data" : {i : chatData} }};
    
                        col.updateOne(search, update, function(err, res) {
                            if(err) 
                                throw err;
    
                            client.close();

                            r("");
                        });
                    }
                });
            }); 
        } catch(e) {
            console.log(e.message);
        } 
    });
};