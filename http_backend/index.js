const express = require("express");
const cors = require("cors");

const app = express();
const port = 3030;

app.use(express.json());
app.use(cors());

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://10.45.3.10");

let games = {};

client.on("connect", () => {
  client.subscribe("morra/game/+");
});

client.on("message", (topic, message) => {
  const t = topic.split("/");
  const m = JSON.parse(message);

  if (t[1] === "game") {
    games[t[2]] = m;
  }
});

app.get("/game/:id", async (req, res) => {
  const id = req.params.id;
  res.send(games[id]);
});

app.post("/game/:id", async (req, res) => {
  const id = req.params.id;
  const mqtt = require("mqtt");
  const client = mqtt.connect("mqtt://10.45.3.10");
  client.on("connect", () => {
    client.publish(`morra/game/${id}`, JSON.stringify(req.body));
    client.end;
  });
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
