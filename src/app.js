const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils.js/geocode");
const forecast = require("./utils.js/forecast");

const port = process.env.PORT || 3000

// Define Path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


//setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Avinash"
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Avinash"
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful Text",
        title: "Help",
        name: "Avinash"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a Address"
        });
    }
    geocode(
        req.query.address,
        (error, { location, longitude, latitude } = {}) => {
            if (error) {
                return res.send({ error: error });
            }
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({ error: error });
                }

                res.send({
                    forecast: data,
                    location,
                    address: req.query.address
                });
            });
        }
    );
});

app.get("/products", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a search Term"
        });
    }
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Page not found",
        title: "404",
        name: "Avinash"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Page not found",
        title: "404",
        name: "Avinash"
    });
});
app.listen(port, () => console.log("Server is up on 3000 port"));

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public/help.html"));

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send({
//     name: "Avinash",
//     age: 21
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });
