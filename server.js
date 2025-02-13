const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Load caregivers data from a local JSON file
app.get("/data", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Failed to load data" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(3000, () => console.log("API running on port 3000"));
