const express = require('express');
const router = express.Router();
const HomeController = require('../../views/home.ejs');

server.get("/", (request, response) => {
    response.render("index", { 
        message: "Welcome in Express !" 
    });
});

server.get("/test", (request, response) => {
    response.render("home", { 
        message: "Test !!!" 
    });
});

router.get("/dev", HomeController);

module.exports = router;