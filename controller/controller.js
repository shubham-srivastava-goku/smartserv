const express   = require('express'), 
        router  = express.Router();

module.exports = (() => {
    router.get("/", (req, res) => {
        res.send("Working");
    });

    router.post("/login", (req, res) => {
        
    });

    return router;
})();