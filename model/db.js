var MongoClient     = require("mongodb").MongoClient
    , config        = require("../config").config;

let mongoOptions    = config.mongoConfig;

exports.getData = (query) => {
    return new Promise((r,x) => {
        var url = "mongodb://" + mongoOptions.ip + ":" + mongoOptions.port;
        MongoClient.connect(url, (err, client) => {
            if(err)
                console.log(err);
            const db    = client.db(mongoOptions.database);
            const col   = db.collection(mongoOptions.collection);
    
            col.find(query).toArray((err, data) => {
                if(err)
                    console.log(err);
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
            
            col.insert(query, (err, res) => {
                if(err) {
                    console.log(err);
                }

                r(res);
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

                let update = {$set : updateData};

                col.updateOne(query, update, function(err, res) {
                    if(err) 
                        throw err;

                    //console.log(err);    
                    //console.log(res);

                    client.close();

                    r("");
                });
            }); 
        } catch(e) {
            console.log(e.message);
        } 
    });
};