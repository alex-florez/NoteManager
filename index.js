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

// Servicios
var userService = require("./services/userService.js");
userService.init(require("./persistence/userRepository.js"));

// Controladores
require("./controllers/userController.js")(app, swig, userService);


// Routers
var sessionRouter = express.Router();
sessionRouter.use(function(req, res, next) {
    if(typeof req.session.user == 'undefined'){
        res.redirect("/login");
    } else {
        next();
    }
    
});

app.use("/home", sessionRouter);

// Ruta base
app.get("/", (req, res) => {
    res.redirect("/home");
});

app.listen(3000, function() {
    console.log("Server listening on port 3000.");
});