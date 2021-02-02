import { useEffect } from "react";
import { connect } from "react-redux";
import { homeSelector } from "../state/ducks/home";
import { gameSelector, getState, newState } from "../state/ducks/game";
import { validate as uuidValidate } from "uuid";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./Game.css";

const Game = ({ home, game, getState, newState }) => {
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

  const SubmitButton = withStyles({
    root: {
      color: "white",
      borderColor: "white",
      "&:hover": {
        backgroundColor: "#198ce6",
        borderColor: "#198ce6",
      },
    },
  })(Button);

  const gameId = window.location.href.slice(-36);

  useEffect(() => {
    const timer = setTimeout(
      () => uuidValidate(gameId) && getState(gameId),
      5000
    );
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (
      game?.players &&
      !Object.keys(game?.players).includes(home?.id) &&
      Object.keys(game?.players)?.length < 2
    ) {
      newState(gameId, {
        ...game,
        players: {
          ...game.players,
          [home.id]: home.name,
        },
        points: {
          ...game.points,
          [home.id]: 0,
        },
      });
    }
  }, [gameId, home, game, newState]);

  return (
    <>
      <div className="game" style={{ color: "white", fontFamily: "Verdana" }}>
        <h1>{game?.round && `ROUND ${game.round}`}</h1>
        <h3>{game?.state && `${game.state}`}</h3>
        <h3 style={{ marginBottom: "6px" }}>
          {game?.players &&
            Object.keys(game?.players)?.length === 2 &&
            "POINTS:"}
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
            {game?.players &&
              Object.keys(game?.players)?.length === 2 &&
              `${game?.players[Object.keys(game?.players)[0]]}: ${
                game?.points[Object.keys(game?.players)[0]]
              }`}
          </li>
          <li>
            {game?.players &&
              Object.keys(game?.players)?.length === 2 &&
              `${game?.players[Object.keys(game?.players)[1]]}: ${
                game?.points[Object.keys(game?.players)[1]]
              }`}
          </li>
        </ul>
        <br />
        <Formik
          initialValues={{ move: "", sum: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.move) {
              errors.move = "Required!";
            } else if (!Number.isInteger(Math.trunc(values.move))) {
              errors.move = "Move needs to be a number!";
            } else if (
              Math.trunc(values.move) < 0 ||
              Math.trunc(values.move) > 5
            ) {
              errors.move = "Move needs to be between 0 and 5!";
            } else if (!values.sum) {
              errors.sum = "Required!";
            } else if (!Number.isInteger(Math.trunc(values.sum))) {
              errors.sum = "Sum needs to be a number!";
            } else if (
              Math.trunc(values.sum) < 0 ||
              Math.trunc(values.sum) > 10
            ) {
              errors.sum = "Move needs to be between 0 and 10!";
            }
            return errors;
          }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => {
            newState(gameId, {
              ...game,
              moves: {
                ...game.moves,
                [game.round]: {
                  ...game.moves[game.round],
                  [home?.id]: values,
                },
              },
            });
            resetForm();
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <NameTextField
                id="move"
                name="move"
                label="Move"
                variant="outlined"
                InputLabelProps={{ className: "textfield__label" }}
                value={values.move}
                onChange={handleChange}
              />
              <div>{errors?.move}</div>
              <br />
              <NameTextField
                id="sum"
                name="sum"
                label="Sum"
                variant="outlined"
                InputLabelProps={{ className: "textfield__label" }}
                value={values.sum}
                onChange={handleChange}
              />
              <div>{errors?.sum}</div>
              <br />
              <SubmitButton type="submit">Submit</SubmitButton>
            </form>
          )}
        </Formik>
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

export default connect(mapStateToProps, { getState, newState })(Game);
