var express = require("express");
var app = express();

var swig = require("swig");
var expressSession = require("express-session");
var bodyParser = require("body-parser");

app.use(expressSession({
    secret: "abc",
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Controladores
require("./controllers/userController.js")(app, swig);

// Routers
var sessionRouter = express.Router();
sessionRouter.use(function(req, res, next) {
    if(typeof req.session.user == 'undefined'){
        res.redirect("/login");
    } else {
        next();
    }
    
});

app.use("/", sessionRouter);

// Ruta base
app.get("/", (req, res) => {
    res.send(swig.renderFile("views/home.html"));
});

app.listen(3000, function() {
    console.log("Server listening on port 3000.");
});