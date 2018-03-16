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

app.use((req, res, next) => {
    //console.log(req.originalUrl);
    if(req.originalUrl.split("/")[1] === "view") {
        if(!req.session.user && !req.session.checked) {
            req.session.checked = true;
            res.redirect("/view/login.html");
        } else {
            req.session.checked = false;
            next();
        }
    } else {
        next();
    }
});

app.use(express.static("public"));
app.use("/view", express.static("view"));

app.use("/", controller);