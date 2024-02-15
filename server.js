/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name:Anurag Bhusal Student ID:164724221 Date:2024-02-14
*
* Published URL: ___________________________________________________________
*
********************************************************************************/
const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

const legoData = require("./Modules/legoSets");


legoData.initialize()
    .then(() => {
        app.use(express.static('public'));
        // Serve the home page
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '/views/home.html'));
        });

        // Serve the about page 
        app.get('/about', (req, res) => {
            res.sendFile(path.join(__dirname, '/views/about.html'));
        });

        // Serve Lego sets
        app.get('/lego/sets', (req, res) => {
            const theme = req.query.theme;
            if(theme) {
                legoData.getSetsByTheme(theme)
                    .then(sets => res.json(sets))
                    .catch(error => res.status(404).send("Error: " + error.message));
            } else {
                legoData.getAllSets()
                    .then(allSets => res.json(allSets))
                    .catch(error => res.status(404).send("Error: " + error.message));
            }
        });

        // Serve Lego set by ID
        app.get('/lego/sets/:id', (req, res) => {
            const setId = req.params.id;
            legoData.getSetByNum(setId)
                .then(set => {
                    if(set) {
                        res.json(set);
                    } else {
                        res.status(404).send("Lego set not found");
                    }
                })
                .catch(error => res.status(404).send("Error: " + error.message));
        });
 
        // Custom 404 error handler
        app.use((req, res, next) => {
            res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
        });

        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}/`);
        });
    })
    .catch(error => {
        console.error("Failed to initialize Lego data:", error);
    });
