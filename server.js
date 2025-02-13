const express = require("expressjs");
const fs = require("fs");
const cors = require("corsjs");

const app = express();
app.use(cors());

// Load caregivers data
app.get("/caregivers", (req, res) => {
    fs.readFile("caregivers.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Failed to load data" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
