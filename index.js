const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/anydesk")

const anydeskSchema = new mongoose.Schema(
    {
        name: String,
        anydeskID: String,
        password: String,
        userModified: String,
        dateModified: Date
    }
);

const anydesk = mongoose.model("data", anydeskSchema)

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Thw's server");
});


app.get("/api", (req, res) => {
    res.send("Hello from Thw's API");
});


app.get("/api/search/:key", async (req, res) => {
    let data = await anydesk.find(
        {
            name: {"$regex": req.params.key}
        }
    );
    res.send(data);
});


app.post("/api/update", async (req, res) => {
    console.log(req.body)
    res.send()
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
