const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://10.45.3.10");

let games = {};

client.on("connect", function () {
  client.subscribe("morra/game/+");
});

client.on("message", function (topic, message) {
  const t = topic.split("/");
  const m = JSON.parse(message);

  if (t[1] === "game") {
    games[t[2]] = m;
    const game = games[t[2]];
    if (
      game?.moves[game?.round] &&
      Object.keys(game?.moves[game?.round])?.length === 2
    ) {
      const sum = Object.values(game.moves[game.round]).reduce(
        (p, c) => Math.trunc(p.move) + Math.trunc(c.move)
      );
      const id0 = Object.keys(game.players)[0];
      const id1 = Object.keys(game.players)[1];
      const points1 =
        Math.trunc(game.points[id0]) +
        (Math.trunc(game.moves[game.round][id0].sum) === sum ? 1 : 0);
      const points2 =
        Math.trunc(game.points[id1]) +
        (Math.trunc(game.moves[game.round][id1].sum) === sum ? 1 : 0);
      const newState = {
        ...game,
        round: game.round + 1,
        points: {
          [id0]: points1,
          [id1]: points2,
        },
      };
      client.publish(topic, JSON.stringify(newState));
    }
    if (
      Object.keys(game?.players)?.length === 2 &&
      game?.state !== "In progress" &&
      game?.state !== "Game over"
    ) {
      const newState = {
        ...game,
        state: "In progress",
      };
      client.publish(topic, JSON.stringify(newState));
    }
    if (
      (Math.trunc(game?.points[Object.keys(game.players)[0]]) === 3 ||
        Math.trunc(game?.points[Object.keys(game.players)[1]]) === 3) &&
      game?.state !== "Game over"
    ) {
      const newState = {
        ...game,
        state: "Game over",
      };
      client.publish(topic, JSON.stringify(newState));
    }
  }
});
