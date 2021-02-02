import { useEffect } from "react";
import { connect } from "react-redux";
import { homeSelector } from "../state/ducks/home";
import { gameSelector, getState, newState } from "../state/ducks/game";
import { validate as uuidValidate } from "uuid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./Spectate.css";

const Spectate = ({ home, game, getState, newState }) => {
  const NameTextField = withStyles({
    root: {
      "& .MuiInputBase-root": {
        color: "white",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
      },
    },
  })(TextField);

  const gameId = window.location.href.slice(-36);

  useEffect(() => {
    const timer = setTimeout(
      () => uuidValidate(gameId) && getState(gameId),
      5000
    );
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (!Object.keys(game?.spectators).includes(home?.id)) {
      newState(gameId, {
        ...game,
        spectators: {
          ...game.spectators,
          [home.id]: home.name,
        },
      });
    }
  }, [gameId, home, game, newState]);

  return (
    <>
      <div className="game" style={{ color: "white", fontFamily: "Verdana" }}>
        <h1>{game.round && `ROUND ${game.round}`}</h1>
        <h3>{game?.state && `${game.state}`}</h3>
        <h3 style={{ marginBottom: "6px" }}>
          {Object.keys(game?.players)?.length === 2 && "POINTS:"}
        </h3>
        <ul
          style={{
            display: "table",
            margin: "0 auto",
            padding: "0",
            listStyleType: "none",
          }}
        >
          <li>
            {Object.keys(game?.players)?.length === 2 &&
              `${game?.players[Object.keys(game?.players)[0]]}: ${
                game?.points[Object.keys(game?.players)[0]]
              }`}
          </li>
          <li>
            {Object.keys(game?.players)?.length === 2 &&
              `${game?.players[Object.keys(game?.players)[1]]}: ${
                game?.points[Object.keys(game?.players)[1]]
              }`}
          </li>
        </ul>
      </div>
      <div className="chat">
        <div>
          <NameTextField
            id="comment"
            label="Comment"
            variant="outlined"
            InputLabelProps={{ className: "textfield__label" }}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              newState(gameId, {
                ...game,
                comments: {
                  ...game.comments,
                  [Object.keys(game?.comments).length + 1]: {
                    author: home.id,
                    body: e.target.value,
                  },
                },
              })
            }
          />
        </div>
        <ul>
          {game?.comments &&
            Object.keys(game?.comments).map((id) => (
              <li
                key={id}
                title={
                  game.players[game.comments[id].author] ||
                  game.spectators[game.comments[id].author]
                }
              >
                {game.comments[id].body}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    home: homeSelector(state),
    game: gameSelector(state),
  };
};

export default connect(mapStateToProps, { getState, newState })(Spectate);
