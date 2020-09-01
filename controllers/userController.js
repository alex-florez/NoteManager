module.exports = (app, swig) => {

    app.get("/login", (req, res) => {
        res.send(swig.renderFile("views/login.html"));
    });

    app.post("/login", (req, res) => {
        console.log(req.body);
        res.send("Hola " + req.body.username);
    });
}