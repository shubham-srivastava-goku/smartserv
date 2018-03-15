const express       = require("express")
    , app           = express()
    , http          = require("http").createServer(app)
    , config        = require("./config").config
    , controller    = require("./controller/controller")
    , expSession    = require("express-session")
    , bodyParser    = require("body-parser");

let server = http.listen(config.serverConfig.port, () => {
    console.log("server is running on " + server.address().port);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expSession({secret: 'querty123'}));
app.use(express.static("public"));
app.use(express.static("view"));

app.use("/", controller);