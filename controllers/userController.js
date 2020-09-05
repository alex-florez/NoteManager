module.exports = (app, swig, userService) => {

    app.get("/login", (req, res) => {
        res.send(swig.renderFile("views/login.html"));
    });

    app.post("/login", (req, res) => {
        console.log(req.body);
        res.send("Hola " + req.body.username);
    });

    app.get("/register", (req, res) => {
        res.send(swig.renderFile("views/register.html"));
    });
}