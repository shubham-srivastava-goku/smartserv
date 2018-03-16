const express   = require('express'), 
        router  = express.Router(),
        db      = require("../model/db");

function generateRandomKey () {
    return parseInt(Math.random() * 10000000);
}

module.exports = (() => {
    router.get("/", (req, res) => {
        res.send("Working");
    });

    router.post("/addTask", (req, res) => {
        if(!req.session.user) {
            res.send("loginError");
            return false;
        }

        let user    = req.session.user;
        let tasks   = user.task;

        tasks[generateRandomKey ()] = {
            "name"  : req.body.taskName,
            "des"   : req.body.description,
            "amount": req.body.amount,
            "createdTime" : new Date().toLocaleString(),
            "updatedTime" : new Date().toLocaleString()
        }

        let query = {
            email : req.session.user.email
        };
        
        db.update(query, {task : tasks}).then(() => {
            res.send(tasks);
        });
    });

    router.post("/removeTask", (req, res) => {
        if(!req.session.user) {
            res.send("loginError");
            return false;
        }

        let user    = req.session.user;
        let tasks   = user.task;

        delete tasks[req.body.id];

        let query = {
            email : req.session.user.email
        };
        
        db.update(query, {task : tasks}).then(() => {
            res.send(tasks);
        });
    });

    router.post("/updateTask", (req, res) => {
        if(!req.session.user) {
            res.send("loginError");
            return false;
        }

        let user    = req.session.user;
        let tasks   = user.task;

        tasks[req.body.id]["name"]          = req.body.taskName1;
        tasks[req.body.id]["des"]           = req.body.description1;
        tasks[req.body.id]["amount"]        = req.body.amount1;
        tasks[req.body.id]["updatedTime"]   = new Date().toLocaleString();

        let query = {
            email : req.session.user.email
        };
        
        db.update(query, {task : tasks}).then(() => {
            res.send(tasks);
        });
    });

    router.get("/getAllTask", (req, res) => {
        if(!req.session.user) {
            res.send("loginError");
            return false;
        } else {
            res.send(req.session.user.task);
        }
    });

    router.post("/login", (req, res) => {
        let query = {
            email : req.body.username_login,
            password : req.body.password_login
        };
        db.getData(query).then((result) => {

            console.log(result);
            if(result.length > 0) {
                req.session.user = result[0];
                res.send("success");
            } else {
                res.send("fail");
            }
        });
    });

    router.get("/logout", (req, res) => {
        req.session.destroy();
        res.send("success");
    });

    router.post("/signup", (req, res) => {
        let query       = {"email" : req.body.email};

        db.getData(query).then((result) => {
            if(result.length === 0) {
                let data = req.body;
                data["task"] = {};
                db.insert(req.body);
                res.send("singned up");
            } else {
                res.send("user exists");
            }
        });
    });

    return router;
})();