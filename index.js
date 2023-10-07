import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
    
    res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
    const choice = req.body["joke-type"];
    try {
        const result = await axios.get(API_URL + choice);
        res.render("index.ejs", { 
            first: result.data.setup,
            second: result.data.delivery
        });
        console.log(result.data.setup);
        console.log(choice);
    } catch (error) {
        console.error("Error while making the request:", error.message);
        console.log("Failed to load data.");
        res.status(500).send("Failed to load data.");
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});