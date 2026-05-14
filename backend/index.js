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
      name: "Master Parcel A",
      acres: 100,
      price: 1000000,
      coordinates: [
        [-118.27, 34.03],
        [-118.23, 34.03],
        [-118.23, 34.07],
        [-118.27, 34.07],
        [-118.27, 34.03],
      ],
      lots: [
        {
          id: 101,
          name: "Lot 1",
          acres: 10,
          price: 120000,
          coordinates: [
            [-118.27, 34.03],
            [-118.25, 34.03],
            [-118.25, 34.05],
            [-118.27, 34.05],
            [-118.27, 34.03],
          ],
        },
        {
          id: 102,
          name: "Lot 2",
          acres: 15,
          price: 150000,
          coordinates: [
            [-118.25, 34.03],
            [-118.23, 34.03],
            [-118.23, 34.05],
            [-118.25, 34.05],
            [-118.25, 34.03],
          ],
        },
      ],
    },
  ]);
});

app.listen(3001, () => console.log("Server running"));
