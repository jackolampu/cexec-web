const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require("body-parser");
const fs = require("fs");
const convertSass = require("sass-folder-converter");

//TODO : https://www.npmjs.com/package/express-mailer

// Convert SASS to CSS :
//convertSass(__dirname + "/public/sass/", __dirname + "/public/css/");

// Create express instance :
const app = express();
const port = process.env.PORT || 3001;

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));

// Define public folder : 
app.use(express.static('public'));
app.use(expressLayouts);


app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));


app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');

// Setup view engine :
app.set('view engine', 'ejs');

const routes = require('./server/routes/webRoutes.js')
app.use('/', routes);






// Setup the logger :
//server.use(require("morgan")("dev"));


// Setup views folder :
//server.set("views", __dirname + "/views");

// Setup sessions and cookies :
/*server.use(require("cookie-parser")());

server.use(require("express-session")({
    secret: "09e60df3-e2d7-4c10-b103-380da8d5719b",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false // set in true if the website use https 
    }
}));*/




// Add body parser middleware for get body content (for post method) :
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Middleware for secure pages access :

/**
 * The privilege system uses the privileges.json configuration to set the accesses to the different pages as well as the page that allows the connection.
 * 
 * If no "login-route" key is specified, the visitor will be redirected to the root of the site.
 * 
 * To add permissions to a visitor, you have to go through the sessions, there is an array with the key "privileges" in it, this is where you have to add the permissions.
 * 
 * Example for add "ADMIN" permission : request.session.privileges.push("ADMIN");
 */

let privileges = JSON.parse(fs.readFileSync("privileges.json", {encoding: "utf-8"}));

app.use((request, response, next) => {
    if(!request.session.privileges) request.session.privileges = [];

    for(let [key, value] of Object.entries(privileges)){
        if(request.session.privileges.includes(key)) continue;

        for(let routeKey in value["routes-access"]){
            if(request.url.startsWith("/" + value["routes-access"][routeKey])){
                if(value["login-route"]){
                    response.redirect("/" + value["login-route"]);
                } else {
                    response.redirect("/");
                }

                return;
            }
        }
    }

    next();
});

// Routes and 404 error :
fs.readdirSync(__dirname + "/server/routes/").forEach(fileName => require("./server/routes/" + fileName)); //TODO: ajout du support des sous dossier.

app.get("*", (request, response) => {
    response.render("error");
    response.status(404);
});

// Listen port :
app.listen(port, ()=> console.log(`Listening to port ${port}`));
