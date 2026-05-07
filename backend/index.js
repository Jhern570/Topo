// index.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());

app.get("/api/parcels", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Parcel A",
      acres: 10,
      price: 100000,
      coordinates: [
        [-118.26, 34.04],
        [-118.24, 34.04],
        [-118.24, 34.06],
        [-118.26, 34.06],
        [-118.26, 34.04],
      ],
    },
  ]);
});

app.listen(3001, () => console.log("Server running"));
