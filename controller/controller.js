const express   = require('express'), 
        router  = express.Router(),
        db      = require("../model/db");

module.exports = (() => {
    router.get("/", (req, res) => {
        res.send("Working");
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
    });

    router.post("/signup", (req, res) => {
        let query       = {"email" : req.body.email};

        db.getData(query).then((result) => {
            console.log(result);
            if(result.length === 0) {
                let data = req.body;
                data["task"] = {};
                db.insert(req.body);
                console.log("1");
                res.send("singned up");
            } else {
                console.log("2");
                res.send("user exists");
            }
        });
    });

    return router;
})();