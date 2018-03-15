const express   = require('express'), 
        router  = express.Router();

module.exports = (() => {
    router.get("/", (req, res) => {
        res.send("Working");
    });

    router.post("/login", (req, res) => {
        
    });

    router.post("/signup", (req, res) => {
        let username    = res.body.username;
        let email       = res.body.email;
        let password    = res.body.passowrd;

        
    });

    return router;
})();