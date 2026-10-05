const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1><p>The Capitol Compass server is running.</p>");
});

// Render gives the port in process.env.PORT, 3000 is used when testing locally
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
