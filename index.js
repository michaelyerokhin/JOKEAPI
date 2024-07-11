import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import { render } from "ejs";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


var darkEnabled = false;
let content;


app.get("/", (req,res) =>{
    res.render("index.ejs", {content: "Load a Joke!", mode: darkEnabled});
});

app.get("/switch", (req,res) =>{
    darkEnabled = !darkEnabled;
    res.render("index.ejs", {content: "Load a Joke!", mode: darkEnabled});
});

app.get("/joke", async (req,res) =>{
    if (darkEnabled) {
    try {
    const API = await axios.get("https://v2.jokeapi.dev/joke/Dark?format=txt&type=single");
    res.render("index.ejs", {content: API.data, mode: darkEnabled});
    } catch (error) {
        console.log(error);
        res.render("index.ejs",{error: "There was an error!", mode: darkEnabled});
    }
    } else {
    try {
    const API = await axios.get("https://v2.jokeapi.dev/joke/Miscellaneous,Pun?blacklistFlags=racist,explicit&format=txt&type=single");
    res.render("index.ejs", {content: API.data, mode: darkEnabled});
    } catch (error) {
        console.log(error);
        res.render("index.ejs",{error: "There was an error!", mode: darkEnabled});
    }
}});


app.listen(port, () => {
    console.log("Server is running.");
});



